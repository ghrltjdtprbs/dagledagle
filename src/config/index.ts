// src/config/index.ts
import defaultConfig from './config.default';
import localConfig from './config.local';
import devConfig from './config.dev';
import prodConfig from './config.prod';
import { merge } from 'lodash';

const NODE_ENV = process.env.NODE_ENV || 'local';

const envConfig = (() => {
  if (NODE_ENV === 'local') return localConfig();
  if (NODE_ENV === 'dev') return devConfig();
  if (NODE_ENV === 'prod') return prodConfig();
  return {};
})();

export const config = merge({}, defaultConfig(), envConfig);
