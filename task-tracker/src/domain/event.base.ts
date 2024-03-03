type Payload = {
  name: string;
  id: string;
  data: Record<string, any>;
};

export class DomainEvent {
  public readonly name: string;
  public readonly id?: string;

  constructor(name: string, id?: string) {
    this.name = name;
    this.id = id;
  }

  toPayload() {
    const result: Payload = {
      name: this.name,
      id: this.id,
      data: {},
    };

    for (const [key, value] of Object.entries(this)) {
      if (key === 'name') {
        continue;
      }
      result.data[key] = value;
    }

    return result;
  }

  toString() {
    return `Event ${this.name}. Payload ${JSON.stringify(this.toPayload())}`;
  }
}
