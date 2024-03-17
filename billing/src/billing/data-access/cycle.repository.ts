import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BillingCycleDA, BillingCycleStatus } from './schemas';

@Injectable()
export class CycleRepository {
  constructor(private ds: DataSource) {}

  async new() {
    const exists = await this.ds.manager.findOne(BillingCycleDA, {
      where: { status: BillingCycleStatus.OPENED },
    });

    if (!exists) {
      const cycle = this.ds.manager.create(BillingCycleDA);

      cycle.open();

      await this.ds.manager.save(cycle);
    }
  }
}
