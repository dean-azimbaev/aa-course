import { Module } from '@nestjs/common';

import { SchemaRegistryModule } from 'src/schema-registry';
import { ConfigurationModule } from 'src/config';
import { UserRepository } from './data-access';
import { ConsumerProviders } from './consumer';

@Module({
  imports: [ConfigurationModule, SchemaRegistryModule],
  providers: [UserRepository, ...ConsumerProviders],
  exports: [UserRepository],
})
export class UserModule {}
