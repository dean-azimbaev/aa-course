import { registerAs } from '@nestjs/config';

import { dbConfig } from './database';
import { brokerConfig } from './broker';

export default registerAs('config', () => ({
  env: process.env.ENV,
  app: {
    http: { port: +process.env.HTTP_PORT },
    host: process.env.HOST,
  },
  jwt: process.env.JWT_VERIFIER,
  ...dbConfig(),
  ...brokerConfig(),
}));
