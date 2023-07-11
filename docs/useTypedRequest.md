# useTypedRequest

> Read [useRequest](https://gitlab.com/patriarche/vuejs-3/vue-3-http/-/tree/main/docs/useRequest.md) to fully understand `useTypedRequest`

A more robust implementation of [useRequest](https://gitlab.com/patriarche/vuejs-3/vue-3-http/-/tree/main/docs/useRequest.md), including data validation throught `zod`

## Definition
```typescript
function useTypedRequest
<T extends AxiosRequestConfig, S extends z.ZodTypeAny>(
  requestConfig: T,
  responseSchema: S,
  options?: Partial<UseRequestOptions>,
): UseRequestReturnType<z.infer<S>>
```
`requestConfig`: 
The config used by the datasource to make the request

`responseSchema`: The [Zod](https://www.npmjs.com/package/zod) schema to validate the response

`options`: [See options](#Options)

## Options

[See useRequest Options](https://gitlab.com/patriarche/vuejs-3/vue-3-http/-/tree/main/docs/useRequest.md#options)

## Return type

[See useRequest Return type](https://gitlab.com/patriarche/vuejs-3/vue-3-http/-/tree/main/docs/useRequest.md#returntype)

## Example
```typescript
import { computed } from 'vue';
import { z } from 'zod';
import { useTypedRequest, type HttpRequest } from '@patriarche/vue-http';

type StarshipsRequest = HttpRequest<'GET', '/starships'>;

const starshipsResponseSchema = z.object({
  results: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

const {
  data,
  loading,
  loaded,
  error,
} = useTypedRequest<StarshipsRequest, typeof starshipsResponseSchema>(
  {
    method: 'GET',
    url: '/starships',
  },
  starshipsResponseSchema,
);

const starships = computed(() => (data.value?.results ? data.value.results : []));
```