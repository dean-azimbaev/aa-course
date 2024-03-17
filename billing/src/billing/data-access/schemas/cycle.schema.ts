import { EntitySchema } from 'typeorm';

export enum BillingCycleStatus {
  CLOSED = 'CLOSED',
  OPENED = 'OPENED',
}
export class BillingCycleDA {
  id: string;
  start_date: Date;
  end_date: Date;
  status: BillingCycleStatus;

  close() {
    this.status = BillingCycleStatus.CLOSED;
  }

  open() {
    const hour24 = 1000 * 86400;
    const startDate = Date.now();

    this.start_date = new Date(startDate);
    this.end_date = new Date(startDate + hour24);
    this.status = BillingCycleStatus.OPENED;
  }
}

export const billingCycleSchema = new EntitySchema<BillingCycleDA>({
  target: BillingCycleDA,
  tableName: 'billing_cycle',
  name: BillingCycleDA.name,
  columns: {
    id: {
      type: 'int',
      generated: 'increment',
      primary: true,
    },
    status: {
      type: 'enum',
      enum: BillingCycleStatus,
    },
    start_date: {
      type: 'timestamptz',
      createDate: true,
    },
    end_date: {
      type: 'timestamptz',
      updateDate: true,
    },
  },
});
