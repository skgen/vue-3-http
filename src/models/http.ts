import { type AxiosRequestConfig, AxiosError, HttpStatusCode } from 'axios';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestConfig = AxiosRequestConfig & {
  throwOnCancel?: boolean;
};

export { AxiosError as RequestError };
export { HttpStatusCode };

export type HttpRequest<TMethod extends HttpMethod, T, S extends Omit<RequestConfig, 'method' | 'url'> | undefined = undefined> =
 S extends undefined ? {
   method: TMethod;
   url: T;
 } : {
   method: TMethod;
   url: T;
 } & S;
