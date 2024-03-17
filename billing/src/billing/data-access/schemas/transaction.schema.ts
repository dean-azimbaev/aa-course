import { EntitySchema } from 'typeorm';

import { BillingCycleDA } from './cycle.schema';
import { UserDA } from '../../../user';

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAWAL',
  PAYMENT = 'PAYMENT',
}

export class TransactionDA {
  id: string;
  account: UserDA;
  debit: number;
  credit: number;
  billing_cycle: BillingCycleDA;
  type: TransactionType;
  comment: string;
}

export const TransactionSchema = new EntitySchema<TransactionDA>({
  tableName: 'transaction',
  target: TransactionDA,
  name: 'Transaction',
  columns: {
    id: {
      type: 'int',
      generated: 'increment',
      primary: true,
    },
    comment: {
      type: 'varchar',
    },
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
  relations: {
    account: {
      type: 'many-to-one',
      target: UserDA.name,
      joinColumn: {
        name: 'account_id',
      },
    },
    billing_cycle: {
      type: 'many-to-one',
      target: BillingCycleDA.name,
      joinColumn: {
        name: 'billing_cycle_id',
      },
    },
  },
});
