import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { ConfigService } from 'src/config';
import { EventMeta } from '../common';

@Injectable()
export class SchemaRegistry {
  private get baseURL() {
    return this.config.schemaRegistryUrl;
  }

  private validateSchema(eventName: string, domain: string, version: number) {
    return `${this.baseURL}/schemas/${domain}/${eventName}/${version}/validate`;
  }

  constructor(
    private config: ConfigService,
    private http: HttpService,
  ) {}

  validate = async (eventMeta: EventMeta, schema: any): Promise<boolean> => {
    return lastValueFrom(
      this.http.post<{ is_valid: boolean }>(
        this.validateSchema(
          eventMeta.name,
          eventMeta.domain,
          eventMeta.version,
        ),
        schema,
      ),
    ).then(({ data }) => data.is_valid);
  };
}
