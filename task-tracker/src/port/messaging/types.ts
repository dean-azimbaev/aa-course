import { IEvent, IEventPublisher } from '@nestjs/cqrs';

import { DomainEvent } from 'src/common';

export interface IDomainEventPublisher extends IEventPublisher<DomainEvent> {
  bind(publisher: IEventPublisher<IEvent>): void;
}
