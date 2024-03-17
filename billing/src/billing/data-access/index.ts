import { TransactionRepository } from './transaction.repository';
import { CycleRepository } from './cycle.repository';

export const DataAccess = [TransactionRepository, CycleRepository];

export { TransactionRepository, CycleRepository };
