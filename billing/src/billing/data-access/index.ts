import { TransactionRepository } from './transaction.repository';
import { CycleRepository } from './cycle.repository';
import { TaskRepository } from './task.repository';

export const DataAccess = [
  TransactionRepository,
  CycleRepository,
  TaskRepository,
];

export { TransactionRepository, CycleRepository, TaskRepository };
