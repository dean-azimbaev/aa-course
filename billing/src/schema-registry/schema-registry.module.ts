import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ConfigurationModule } from 'src/config';
import { SchemaRegistry } from './schema-registry.service';

@Module({
  imports: [HttpModule, ConfigurationModule],
  providers: [SchemaRegistry],
  exports: [SchemaRegistry],
})
export class SchemaRegistryModule {}
