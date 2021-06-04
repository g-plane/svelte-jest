import * as path from 'path'
import { execSync } from 'child_process'
import * as svelte from 'svelte/compiler'
import type { CompileOptions } from 'svelte/types/compiler/interfaces'

type CompiledJS = { code: string; map: string }

function transform(
  sourceText: string,
  sourcePath: string,
  { transformerConfig: options }: { transformerConfig: CompileOptions },
): CompiledJS {
  const preprocessed = execSync(
    `${process.execPath} --unhandled-rejections=strict ` +
      require.resolve('../dist/preprocess.js'),
    { env: { source: sourceText, filename: sourcePath } },
  ).toString()

  const { js }: { js: CompiledJS } = svelte.compile(preprocessed, {
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
