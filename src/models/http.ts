export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpRequest<TMethod extends HttpMethod, T> = {
  method: TMethod;
  url: T;
};
