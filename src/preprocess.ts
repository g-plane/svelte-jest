import * as svelte from 'svelte/compiler'
import sveltePreprocess from 'svelte-preprocess'

const { source, filename } = process.env
svelte
  .preprocess(source!, sveltePreprocess({ sourceMap: true }), {
    filename,
  })
  .then(({ code }) => process.stdout.write(code))
