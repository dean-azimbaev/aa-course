import { IEvent, IEventPublisher } from '@nestjs/cqrs';
import { Producer } from 'kafkajs';

import { DomainEvent } from 'src/domain';

export interface DomainProducer
  extends IEventPublisher<DomainEvent>,
    Partial<Producer> {
  bind(publisher: IEventPublisher<IEvent>): void;
}
