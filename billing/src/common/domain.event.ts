export class DomainEvent {
  public readonly name: string;

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
