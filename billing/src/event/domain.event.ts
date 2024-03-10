export class DomainEvent {
  constructor(
    public readonly name: string,
    public public_id: string,
  ) {}

  toJSON() {
    const result = {};

    for (const [key, value] of Object.entries(this)) {
      result[key] = value;
    }

    return result;
  }

  toString() {
    return `Domain event: ${this.name} data: ${JSON.stringify(this.toJSON())}`;
  }
}
