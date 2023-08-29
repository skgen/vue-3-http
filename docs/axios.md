# Re-exports

The package is based on `Axios` http provider, it re-exports some of its features :

## RequestError

An alias to `AxiosError`, can be used in try/catch to check if the error comes from a request

```typescript
import { RequestError } from '@patriarche/vue-auth'
```

## HttpStatusCode

The list of all HTTP status code as an enum

```typescript
import { HttpStatusCode } from '@patriarche/vue-auth'
```

