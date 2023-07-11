import type { ZodError } from 'zod';

export class HttpResponseTypeError extends TypeError {
  zodError: ZodError;

  name = 'HttpResponseTypeError';

  constructor(zodError: ZodError, config: {
    url: string | null;
    method: string | null;
  }) {
    let message = 'HTTP response model & App expected model mismatch';
    const precisions: string[] = [];
    const method = config.method ?? 'GET';
    precisions.push(`[${method}]`);
    if (config.url) {
      precisions.push(`${config.url}`);
    }
    message += `\non ${precisions.join(' ')}`;
    super(message);
    this.zodError = zodError;
  }
}
