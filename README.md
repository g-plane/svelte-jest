# 🚀 svelte-jest

![](https://img.shields.io/github/workflow/status/g-plane/svelte-jest/CI?style=flat-square)
![](https://img.shields.io/npm/v/@gplane/svelte-jest?style=flat-square)

Jest custom transformer for transforming Svelte.

This package is inspired by [`svelte-jester`](https://www.npmjs.com/package/svelte-jester),
but this package is opinionated and simple: It requires [`svelte-preprocess`](https://www.npmjs.com/package/svelte-preprocess) to do transformation and it doesn't provide any configurations.

If you need to customize something,
use [`svelte-jester`](https://www.npmjs.com/package/svelte-jester) instead.

## 🔥 Features

- Source code is written in TypeScript.
- No configuration (`svelte.config.js`) is required.
- Better compatibility in some cases.
- Leverage Jest's asynchronous transformers, so it's faster than those use `child_process` to transform Svelte code.

## 💿 Install

```shell
npm i @gplane/svelte-jest
```

## 🎨 Usage

Update your Jest configuration like this:

```json
"transform": {
  "^.+\\.svelte$": "@gplane/svelte-jest"
}
```

If you're using TypeScript or other Jest transformers,
please also add them properly:

```json
"transform": {
  "^.+\\.svelte$": "@gplane/svelte-jest",
  "^.+\\.tsx?$": "ts-jest"
}
```

## 📜 License

MIT License

2020-present (c) Pig Fang
