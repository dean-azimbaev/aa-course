export class CUDEvent {
  public readonly public_id?: string;

  constructor(public readonly name: string) {}

  toJSON() {
    const json: Record<string, any> = {};

    for (const [key, value] of Object.entries(this)) {
      if (value) {
        json[key] = value;
      }
    }

    return json;
  }
}
