# useRequest

A hook for making requests, handling `data`, `loaded`, `loading` states & `error`s

A request is automatically sent if the requestConfig changes.

If multiple request "should" overlap due to firing too fast, an autocancel feature is implemented to prevent this scenario.

The current request is always the implementation of the latest configuration.

The current `data`, `loaded`, `loading` states & `error`s, are always the implementation of the latest request.

## Definition
```typescript
function useRequest<TRequest extends AxiosRequestConfig, TResponse>(
  requestConfig: TRequest,
  options?: Partial<UseRequestOptions>,
): UseRequestReturnType<TResponse>
```
`requestConfig`: 
The config used by the datasource to make the request

`options`: [See options](#Options)

## Options

```typescript
type UseRequestOptions = {
  immediate: boolean;
  provider?: HttpProvider;
  watch: boolean;
};
```
`immediate`: 
Whether or not you want it to run immediatly (similar to Vue `watch`), setting if to `false` will force the hook to wait until config changes to make a request. Defaults to `true`

`httpProvider`: The `HttpProvider` to use for the request. Defaults to main `HttpProvider`

`watch`: Whether or not you want to send a request everytime the config changes, similar to `immediate` but for the life of the hook, can be used to "pause" the hook, Defaults to `true`

## Return type
```typescript
type UseRequestReturnType<TResponse> = {
  data: Ref<TResponse | null>;
  loading: Ref<boolean>;
  loaded: Ref<boolean>;
  error: Ref<Error | null>;
  revalidate: () => Promise<void>;
};
```
`data`: The data you are requesting

`loading`: A boolean representing if the current request is running

`loaded`: A boolean representing if a request has already finished

`error`: The current error if any happens, it is reset on next request

`revalidate`: A method for manually sending a request with the current config

## Example
```typescript
import { computed } from 'vue';
import { useRequest, type HttpRequest } from '@patriarche/vue-http';

type StarshipsRequest = HttpRequest<'GET', '/starships'>;

type StarshipsResponse = {
  results: {
    name: string;
  }[];
};

const {
  data,
  loading,
  loaded,
  error,
} = useRequest<StarshipsRequest, StarshipsResponse>({
  method: 'GET',
  url: '/starships',
});

const starships = computed(() => (data.value?.results ? data.value.results : []));
```