import { CUDEvent, DomainEvent } from 'src/common';

export class NewTaskAdded extends DomainEvent {}
export class TaskAssigned extends DomainEvent {}

export class TaskCreated extends CUDEvent {}
export class TaskUpdated extends CUDEvent {}
