export class CUDEvent {
  public public_id: string;
  constructor(public readonly name: string) {}

  toJSON() {
    const result = {};

    for (const [key, value] of Object.entries(this)) {
      result[key] = value;
    }

    return result;
  }

  toString() {
    return `CUD Event: ${this.name} ${JSON.stringify(this.toJSON())}`;
  }
}
