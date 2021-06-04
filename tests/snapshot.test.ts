import { promises as fs } from 'fs'
import * as path from 'path'
import transformer from '../src'

const { process } = transformer

test('basic transformation', async () => {
  const file = await fs.readFile(
    path.join(__dirname, 'fixtures/ExampleComponent.svelte'),
    'utf-8',
  )
  const js = await process(file, 'ExampleComponent.svelte', {
    transformerConfig: {},
  })
  expect(js.code).toMatchSnapshot('code')
  expect(js.map).toMatchSnapshot('sourcemap')
})

test('with options', async () => {
  const file = await fs.readFile(
    path.join(__dirname, 'fixtures/ExampleComponent.svelte'),
    'utf-8',
  )
  const js = await process(file, 'ExampleComponent.svelte', {
    transformerConfig: {
      customElement: true,
      tag: 'snapshot-example',
    },
  })
  expect(js.code).toMatchSnapshot('code')
  expect(js.map).toMatchSnapshot('sourcemap')
})

test('transform to ESM', async () => {
  const file = await fs.readFile(
    path.join(__dirname, 'fixtures/ExampleComponent.svelte'),
    'utf-8',
  )
  const js = await process(file, 'ExampleComponent.svelte', {
    transformerConfig: { format: 'esm' },
  })
  expect(js.code).toMatchSnapshot('code')
  expect(js.map).toMatchSnapshot('sourcemap')
})
