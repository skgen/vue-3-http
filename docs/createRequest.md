# createRequest

A function to create/exec/cancel a request the easiest way

## Definition
```typescript
type Request<TRequest extends RequestConfig, TResponse = unknown> = {
  exec: (config?: TRequest) => Promise<AxiosResponse<TResponse, TRequest['data']> | null>;
  cancel: () => boolean;
};

function createRequest<TRequest extends RequestConfig, TResponse = unknown>(
  defaultRequestConfig?: TRequest,
  options?: CreateRequestOptions,
): Request<TRequest, TResponse>
```

`defaultRequestConfig`: The config used by the datasource to make the request

`options`: [See options](#Options)

## Options

```typescript
type CreateRequestOptions = {
  httpProvider?: HttpProvider;
  onLoadingChange?: (loading: boolean) => void;
};
```
`httpProvider`: The `HttpProvider` to use for the request. Defaults to main `HttpProvider`

`onLoadingChange`: A callback to track loading changes, firing when requests starts & when it ends.

## Return type
```typescript
type Request<TRequest extends RequestConfig, TResponse> = {
  exec: (config?: TRequest) => Promise<AxiosResponse<TResponse, TRequest['data']> | null>;
  cancel: () => boolean;
};
```
`exec`: A function to execute a request with the current configuration, you can pass another configuration to merge on execution.

`cancel`: A function to cancel the current running request, if no request is running, it won't do anything.

## Example
```typescript
import { createRequest, type HttpRequest } from '@patriarche/vue-http';
import { onMounted, ref } from 'vue';

type StarshipsRequest = HttpRequest<'GET', '/starships'>;

type StarshipsResponse = {
  results: {
    name: string;
  }[];
};

const loading = ref(false);
const error = ref<RequestError | null>(null);
const loaded = ref(false);
const starships = ref<{ name: string }[]>([]);

const { exec, cancel } = createRequest<StarshipsRequest, StarshipsResponse>(
  {
    method: 'GET',
    url: '/starships',
  },
  {
    onLoadingChange: ((newLoading) => {
      loading.value = newLoading;
    }),
  },
);

async function getData() {
  try {
    cancel();
    const res = await exec();
    if (res) {
      starships.value = res.data.results;
    }
  } catch (e) {
    if (e instanceof RequestError) {
      error.value = e;
    }
    throw e;
  } finally {
    loaded.value = true;
  }
}

onMounted(getData);
```