import ExampleComponent from './fixtures/ExampleComponent.svelte'

test('basic run', () => {
  const instance = new ExampleComponent({ target: document.body })
  expect(document.querySelector('#btn')).not.toBeNull()

  instance.$destroy()
  expect(document.querySelector('#btn')).toBeNull()
})
