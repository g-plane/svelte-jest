import * as path from 'path'
import { execSync } from 'child_process'
import * as svelte from 'svelte/compiler'
import type { CompileOptions } from 'svelte/types/compiler/interfaces'

type CompiledJS = { code: string; map: string }

function transform(options: CompileOptions) {
  return (source: string, filename: string): CompiledJS => {
    const preprocessed = execSync(
      `${process.execPath} --unhandled-rejections=strict ` +
        require.resolve('../dist/preprocess.js'),
      { env: { source, filename } },
    ).toString()

    const { js }: { js: CompiledJS } = svelte.compile(preprocessed, {
      filename: path.basename(filename),
      css: false,
      accessors: true,
      dev: true,
      format: 'cjs',
      ...options,
    })

    js.code = `${js.code}Object.defineProperty(exports, "__esModule", { value: true });`

    return js
  }
}

export default {
  createTransformer(options: CompileOptions = {}) {
    return {
      process: transform(options),
    }
  },
}
