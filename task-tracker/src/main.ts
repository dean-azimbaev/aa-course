import { NestFactory } from '@nestjs/core';
import { ConfigService as Config } from './config';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('main.ts');

  const {
    app: { http },
  } = app.get<Config>(Config);

  await app.listen(http.port).then(() => {
    logger.debug(`App started on http port: ${http.port}`);
  });
}

bootstrap();
