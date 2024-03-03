export class DomainEvent {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  toPayload() {
    const result = {
      name: this.name,
      data: {},
    };

    const data: Record<string, any> = {};

    for (const [key, value] of Object.entries(this)) {
      if (key === 'name') {
        continue;
      }
      data[key] = value;
    }

    result.data = data;

    return result;
  }

  toString() {
    return `Event ${this.name}. Payload ${JSON.stringify(this.toPayload())}`;
  }
}
