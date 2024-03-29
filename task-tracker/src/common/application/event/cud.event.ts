import { SerializableEvent } from 'src/common/interfaces';

export class CUDEvent implements SerializableEvent {
  public readonly public_id?: string;

  constructor(public readonly name: string) {}

  toJSON() {
    const json: Record<string, any> = {};

    for (const [key, value] of Object.entries(this)) {
      json[key] = value;
    }

    return json;
  }
}
