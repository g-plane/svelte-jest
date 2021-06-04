import { promises as fs } from 'fs'
import * as path from 'path'
import transformer from '../src'

const { createTransformer } = transformer

test('basic transformation', async () => {
  const file = await fs.readFile(
    path.join(__dirname, 'fixtures/ExampleComponent.svelte'),
    'utf-8',
  )
  const transformer = createTransformer()
  const js = transformer.process(file, 'ExampleComponent.svelte')
  expect(js.code).toMatchSnapshot('code')
  expect(js.map).toMatchSnapshot('sourcemap')
})

test('with options', async () => {
  const file = await fs.readFile(
    path.join(__dirname, 'fixtures/ExampleComponent.svelte'),
    'utf-8',
  )
  const transformer = createTransformer({
    customElement: true,
    tag: 'snapshot-example',
  })
  const js = transformer.process(file, 'ExampleComponent.svelte')
  expect(js.code).toMatchSnapshot('code')
  expect(js.map).toMatchSnapshot('sourcemap')
})
