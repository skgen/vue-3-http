import {
  ref, watch, type Ref, type WatchStopHandle, reactive, toRefs, isReactive,
} from 'vue';
import merge from 'lodash/merge';
import { createRequest } from '@src/lib/createRequest';
import type { HttpProvider } from '@src/index';
import { logger } from '@src/lib/logger';
import { type RequestConfig, RequestError } from '@src/models/http';

export type UseRequestOptions = {
  immediate: boolean;
  httpProvider?: HttpProvider;
  watch: boolean;
};

const defaultOptions: UseRequestOptions = {
  immediate: true,
  watch: true,
};

export type UseRequestReturnType<TResponse = unknown> = {
  data: Ref<TResponse | null>;
  loading: Ref<boolean>;
  loaded: Ref<boolean>;
  error: Ref<Error | null>;
  revalidate: () => Promise<void>;
};

export default function useRequest<TRequest extends RequestConfig, TResponse = unknown>(
  requestConfig: TRequest,
  options?: Partial<UseRequestOptions>,
): UseRequestReturnType<TResponse> {
  const mergedOptions: UseRequestOptions = reactive(
    merge(
      { ...defaultOptions },
      options ? { ...(isReactive(options) ? toRefs(options) : options) } : {},
    ),
  ) as UseRequestOptions;

  const computedConfig = isReactive(requestConfig) ? requestConfig : reactive(requestConfig) as TRequest;

  const data: Ref<TResponse | null> = ref(null);
  const loading = ref(false);
  const loaded = ref(false);
  const error = ref<Error | null>(null);

  const { exec, cancel } = createRequest<TRequest, TResponse>(undefined, {
    httpProvider: mergedOptions.httpProvider,
    onLoadingChange: (newLoading) => {
      loading.value = newLoading;
    },
  });

  let stopWatchingConfig: WatchStopHandle | null = null;

  async function updateData() {
    error.value = null;
    cancel();
    try {
      const res = await exec({ ...computedConfig });
      if (res) {
        data.value = res.data as TResponse;
      }
    } catch (e) {
      if (e instanceof RequestError) {
        error.value = e;
        logger.error(e);
      } else {
        throw e;
      }
      data.value = null;
    } finally {
      loaded.value = true;
    }
  }

  watch(() => mergedOptions.watch, (newWatch) => {
    if (newWatch) {
      stopWatchingConfig = watch(computedConfig, () => {
        updateData();
      }, {
        immediate: mergedOptions.immediate,
      });
    } else if (stopWatchingConfig) {
      stopWatchingConfig();
    }
  }, {
    immediate: true,
  });

  async function revalidate() {
    updateData();
  }

  return {
    data,
    loading,
    loaded,
    error,
    revalidate,
  };
}
