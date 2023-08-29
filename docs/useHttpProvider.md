# useHttpProvider

A hook for getting the `HttpProvider` defined as `main` throught `vue` reactive API

## Definition
```typescript
function useHttpProvider(): UseHttpProviderReturnType
```

## Return type
```typescript
type UseHttpProviderReturnType = {
  httpProvider: Ref<HttpProvider>;
};
```
`httpProvider`: The `httpProvider` defined as `main`, if none is explicitly provided, a default one is provided as fallback 

## Example
```typescript
import { useHttpProvider, RequestError } from '@patriarche/vue-http';
import { onMounted, ref } from 'vue';

const { httpProvider } = useHttpProvider();

const error = ref<RequestError | null>(null);
const loaded = ref(false);
const loading = ref(false);
const starships = ref<{ name: string }[]>([]);

async function getData() {
  loading.value = true;
  const { datasource } = httpProvider.value;
  try {
    const res = await datasource.get('/starships');
    starships.value = res.data.results;
    loading.value = false;
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