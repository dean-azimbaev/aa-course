import { SerializableEvent } from 'src/common/interfaces';

export class DomainEvent implements SerializableEvent {
  public readonly name: string;
  public readonly public_id?: string;

  constructor(name: string) {
    this.name = name;
  }

  toJSON() {
    const json: Record<string, any> = {};

    for (const [key, value] of Object.entries(this)) {
      json[key] = value;
    }

    return json;
  }

  toString(): string {
    return `Domain Event: ${this.name}, ${this.toJSON()}`;
  }
}
