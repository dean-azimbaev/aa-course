import { EntitySchema } from 'typeorm';

import { BillingCycleDA } from './billing-cycle.schema';
import { UserDA } from '../user';

enum TransactionStatus {
  FAILED = 'FAILED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  PAYMENT = 'PAYMENT',
}

export class TransactionDA {
  id: string;
  account: UserDA;
  status: TransactionStatus;
  debit: number;
  credit: number;
  billing_cycle: BillingCycleDA;
  type: TransactionType;
}

export const TransactionSchema = new EntitySchema<TransactionDA>({
  tableName: 'transaction',
  target: TransactionDA,
  name: 'Transaction',
  columns: {
    debit: {
      type: 'numeric',
      default: 0,
      precision: 20,
      scale: 2,
    },
    credit: {
      type: 'numeric',
      default: 0,
      precision: 20,
      scale: 2,
    },
  },
  relations: {},
});
