import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthProducer } from './app.producer';

import { ConfigurationModule, ConfigService } from './config';
import { AppController } from './app.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwt-secret-:p'
    }),
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigService],
      useFactory: ({ pg }: ConfigService) => pg,
    }),
  ],
  controllers: [AppController],
  providers: [AuthProducer, AuthService],
})
export class AppModule {}
