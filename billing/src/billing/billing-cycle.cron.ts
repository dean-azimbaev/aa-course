import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CycleRepository } from './data-access';

@Injectable()
export class BillingCycleCron implements OnApplicationBootstrap {
  constructor(private repo: CycleRepository) {}

  async onApplicationBootstrap() {
    await this.repo.new();
  }

  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'close-billing-cycle',
  })
  async close() {
    console.log('Blling cycle !');
    // const currentBillingCycle = await this.ds.manager.findOne(BillingCycleDA, {
    //   where: { status: BillingCycleStatus.OPENED },
    // });

    // const transactions = await this.ds.manager.find(TransactionDA, {
    //   where: { billing_cycle: currentBillingCycle },
    // });
  }
}
