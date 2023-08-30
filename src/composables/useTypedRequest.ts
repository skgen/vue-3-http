import {
  ref, watch, type Ref, computed,
} from 'vue';
import { ZodError, z } from 'zod';
import isNil from 'lodash/isNil';
import useRequest, { type UseRequestOptions, type UseRequestReturnType } from '@src/composables/useRequest';
import { logger } from '@src/lib/logger';
import { HttpResponseTypeError } from '@src/models/httpResponseTypeError';
import { type RequestConfig, RequestError } from '@src/models/http';

export default function useTypedRequest
<T extends RequestConfig, S extends z.ZodTypeAny>(
  requestConfig: T,
  responseSchema: S,
  options?: Partial<UseRequestOptions>,
): UseRequestReturnType<z.infer<S>> {
  type ResponseSchema = z.infer<S> | null;
  const data: Ref<ResponseSchema> = ref(null);
  const error = ref<Error | null>(null);

  const {
    data: reqData, loading, loaded, error: reqError, revalidate,
  } = useRequest(requestConfig, options);

  watch(reqData, (newReqData) => {
    if (isNil(newReqData)) {
      error.value = null;
      data.value = null;
      return;
    }
    try {
      const parsedData = responseSchema.parse(newReqData);
      data.value = parsedData;
    } catch (e) {
      if (e instanceof ZodError) {
        const typeError = new HttpResponseTypeError(e, {
          url: requestConfig.url ?? null,
          method: requestConfig.method ?? null,
        });
        error.value = typeError;
        logger.error(typeError);
      } else if (e instanceof RequestError) {
        error.value = e;
        logger.error(e);
      } else {
        throw e;
      }
      data.value = null;
    }
  });

  const forwardedError = computed(() => error.value ?? reqError.value);

  return {
    data,
    loading,
    loaded,
    error: forwardedError,
    revalidate,
  };
}
