import { name as packageName } from '../../package.json';

type LogParameters = Parameters<typeof console.log>;
type LogCallback = typeof console.log;

function log(l: LogParameters, o: LogCallback) {
  o(`${packageName}: ${l}`);
}

export const logger = {
  log(...l: LogParameters) {
    log(l, console.log);
  },
  warn(...l: LogParameters) {
    log(l, console.warn);
  },
  error(...l: LogParameters) {
    log(l, console.error);
  },
};
