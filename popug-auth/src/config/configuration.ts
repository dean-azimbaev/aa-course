import { registerAs } from '@nestjs/config';

import { dbConfig } from './database';

export default registerAs('config', () => ({
  env: process.env.ENV,
  app: {
    http: { port: +process.env.HTTP_PORT },
    host: process.env.HOST,
  },
  ...dbConfig(),
}));
