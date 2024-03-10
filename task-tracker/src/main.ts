import { NestFactory } from '@nestjs/core';
import { ConfigService as Config } from './config';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
      },
    });

  app.connectMicroservice(microservice);

  const logger = new Logger('main.ts');

  const {
    app: { http },
  } = app.get<Config>(Config);

  await app.startAllMicroservices();

  await app.listen(http.port).then(() => {
    logger.debug(`App started on http port: ${http.port}`);
  });
}

bootstrap();
