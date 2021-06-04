import * as path from 'path'
import * as svelte from 'svelte/compiler'
import sveltePreprocess from 'svelte-preprocess'
import type { CompileOptions } from 'svelte/types/compiler/interfaces'

type TransformedSource = { code: string; map?: string }

async function transform(
  sourceText: string,
  sourcePath: string,
  { transformerConfig: options }: { transformerConfig: CompileOptions },
): Promise<TransformedSource> {
  const preprocessed = await svelte.preprocess(
    sourceText,
    sveltePreprocess({ sourceMap: true }),
    { filename: sourcePath },
  )

  const { js }: { js: TransformedSource } = svelte.compile(preprocessed.code, {
    filename: path.basename(sourcePath),
    css: false,
    accessors: true,
    dev: true,
    format: 'cjs',
    ...options,
  })

  if (!options.format || options.format === 'cjs') {
    js.code += 'Object.defineProperty(exports, "__esModule", { value: true });'
  }

  return js
}

export default {
  process: transform,
}
