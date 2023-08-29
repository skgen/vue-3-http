# @patriarche/vue-http

## Installation

```bash
yarn add @patriarche/vue-http
```

## Why ?

`@patriarche/vue-http` has been created to handle HTTP requests the best way fitting each situation
It is based on creating an `HttpProvider` and exploiting its `datasource`

Datasource is (under the hood) an instance of `AxiosInsance`

You can create `HttpProvider`s on the fly and/or set one as `main` for reuse purposes

Every hook composing `@patriarche/vue-http` use the `HttpProvider` defined as `main`, using a default one as fallback if none is explicitly provided

## Setup
### Creating & using an HttpProvider

```typescript
const httpProvider = createHttpProvider({
  baseURL: 'https://swapi.dev/api',
});

const { datasource } = httpProvider;

await datasource.get('/starships');
```

### Setting main provider

```typescript
createHttpProvider({
  baseURL: 'https://swapi.dev/api',
}, {
  main: true,
});
```

## Main features

### [createRequest](https://gitlab.com/patriarche/vuejs-3/vue-3-http/-/tree/main/docs/createRequest.md)

A function to create/exec/cancel a request the easiest way

### [useHttpProvider](https://gitlab.com/patriarche/vuejs-3/vue-3-http/-/tree/main/docs/useHttpProvider.md)

A hook for getting the `HttpProvider` defined as `main` throught `vue` reactive API

### [useRequest](https://gitlab.com/patriarche/vuejs-3/vue-3-http/-/tree/main/docs/useRequest.md)

A hook for making requests, handling `data`, `loaded`, `loading` states & `error`s

### [useTypedRequest](https://gitlab.com/patriarche/vuejs-3/vue-3-http/-/tree/main/docs/useTypedRequest.md)

A more robust implementation of [useRequest](https://gitlab.com/patriarche/vuejs-3/vue-3-http/-/tree/main/src/useRequest/index.md), including data validation throught `zod`

## Some Zod schema helpers

### For PUX standard request

`entitySchema`: A base schema providing attributes of an **Entity** request

`collectionSchema`: A base schema builder providing attributes of a *paginated* **Collection** request

`rawCollectionSchema`: A base schema builder providing attributes of an *unpaginated* **Collection** request

### For Hydra standard request

`hydraEntitySchema`: A base schema builder providing attributes of an [Hydra](https://www.markus-lanthaler.com/hydra/) **Entity** request

`hydraCollectionSchema`: A base schema builder providing attributes of an [Hydra](https://www.markus-lanthaler.com/hydra/) **Collection** request

## Re-exports

A list of re-exports from `Axios`,
see [here](https://gitlab.com/patriarche/vuejs-3/vue-3-http/-/tree/main/docs/axios.md).