import {
  CanceledError, type AxiosResponse,
} from 'axios';
import merge from 'lodash/merge';
import { getHttpProvider, type HttpProvider } from '@src/lib/httpProvider';
import type { RequestConfig } from '@src/models/http';

export type Request<TRequest extends RequestConfig, TResponse = unknown> = {
  exec: (config?: TRequest) => Promise<AxiosResponse<TResponse, TRequest['data']> | null>;
  cancel: () => boolean;
};

export type CreateRequestOptions = {
  httpProvider?: HttpProvider;
  onLoadingChange?: (loading: boolean) => void;
};

export function createRequest<TRequest extends RequestConfig, TResponse = unknown>(
  defaultRequestConfig?: TRequest,
  options?: CreateRequestOptions,
): Request<TRequest, TResponse> {
  const { throwOnCancel, ...defaultAxiosRequestConfig } = defaultRequestConfig ?? ({} as RequestConfig);
  let controller: AbortController | null = null;

  function setLoading(newLoading: boolean) {
    if (options?.onLoadingChange) {
      options.onLoadingChange(newLoading);
    }
  }

  async function exec<TRequestExec extends RequestConfig>(config?: TRequestExec) {
    type RequestDefaultConfig = typeof defaultAxiosRequestConfig;
    controller = new AbortController();
    const merged = merge(merge({}, defaultAxiosRequestConfig), config);
    setLoading(true);
    let res = null;
    try {
      res = await (options?.httpProvider?.datasource ?? getHttpProvider().datasource)
        .request<RequestDefaultConfig & TRequestExec, AxiosResponse<TResponse, RequestDefaultConfig['data'] & TRequestExec['data']>>({
        ...merged,
        signal: controller.signal,
      });
    } catch (e) {
      if (e instanceof CanceledError) {
        if (throwOnCancel) {
          throw e;
        } else {
          return null;
        }
      }
      throw e;
    } finally {
      setLoading(false);
    }
    return res;
  }

  function cancel(): boolean {
    if (controller) {
      controller.abort();
      return true;
    }
    return false;
  }

  return {
    exec,
    cancel,
  };
}
