// Using
// @/modules/authentication

import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios';
import merge from 'lodash/merge';

const defaultConfig: CreateAxiosDefaults = {
  timeout: 30000,
  headers: {
    accept: 'application/json',
  },
};

export type HttpProvider = {
  datasource: AxiosInstance;
};

let mainHttpProvider: HttpProvider | null = null;

type CreateHttpProviderOptions = {
  main?: boolean;
};

const defaultOptions = {
  main: false,
};

type ListenerCallback = (httpProvider: HttpProvider) => void;
let listeners: ListenerCallback[] = [];

export function onMainHttpProviderChange(callback: ListenerCallback) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((listener) => listener !== callback);
  };
}

export function createHttpProvider(config?: CreateAxiosDefaults, options?: CreateHttpProviderOptions) {
  const mergedOptions = merge(merge({}, defaultOptions), options);
  const mergedConfig = merge(merge({}, defaultConfig), config);

  const httpProvider: HttpProvider = {
    datasource: axios.create(mergedConfig),
  };

  if (mergedOptions.main) {
    mainHttpProvider = httpProvider;
    for (const listener of listeners) {
      listener(mainHttpProvider);
    }
  }

  return httpProvider;
}

const fallbackHttpProvider: HttpProvider = createHttpProvider(defaultConfig);

export function getHttpProvider(): HttpProvider {
  return mainHttpProvider ?? fallbackHttpProvider;
}
