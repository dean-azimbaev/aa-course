import { Module } from '@nestjs/common';

import { ConfigurationModule } from 'src/config';
import { SchemaRegistryModule } from 'src/schema-registry';

import { BillingCycleCron } from './billing-cycle.cron';
import { DataAccess } from './data-access';
import { TaskConsumerProviders } from './task-consumer';
import { UserModule } from 'src/user';

@Module({
  imports: [SchemaRegistryModule, ConfigurationModule, UserModule],
  providers: [BillingCycleCron, ...DataAccess, ...TaskConsumerProviders],
})
export class BillingModule {}
