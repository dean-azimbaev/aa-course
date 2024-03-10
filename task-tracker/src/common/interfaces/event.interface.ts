export interface SerializableEvent {
  readonly name: string;

  toJSON(): Record<string, any>;
}


