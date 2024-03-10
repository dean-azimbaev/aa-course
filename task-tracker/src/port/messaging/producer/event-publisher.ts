import { IEvent, IEventPublisher } from '@nestjs/cqrs';

import { DomainEvent } from 'src/common';
import { IDomainEventPublisher } from './types';
import { TaskTrackerProducer } from './producer';

export class DomainEventPublisher implements IDomainEventPublisher {
  private _original: IEventPublisher;

  constructor(private producer: TaskTrackerProducer) {}

  publish = <TEvent extends DomainEvent>(event: TEvent, context?: unknown) => {
    if (event instanceof DomainEvent) {
      this.producer.produce(event);
    }

    if (this._original?.publish) {
      this._original.publish(event, context);
    }
  };

  bind($publisher: IEventPublisher<IEvent>) {
    this._original = $publisher;
  }
}
