import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { TransactionDA, TransactionType } from './schemas/transaction.schema';
import { BillingCycleDA, BillingCycleStatus } from './schemas/cycle.schema';
import { UserDA } from 'src/user/data-access';

@Injectable()
export class TransactionRepository {
  constructor(private ds: DataSource) {}

  async apply_deposit_transaction(
    amount: number,
    account_id: string,
    comment: string,
  ) {
    // // start db transaction
    // const billing_cycle = await this.ds.manager.findOne(BillingCycleDA, {
    //   where: { status: BillingCycleStatus.OPENED },
    // });
    // const user = await this.ds.manager.findOne(UserDA, {
    //   where: { public_id: account_id },
    // });
    // const transaction: Partial<TransactionDA> = {
    //   account: user,
    //   type: TransactionType.DEPOSIT,
    //   debit: amount,
    //   billing_cycle,
    //   comment,
    // };
    // user.balance += transaction.debit;
    // await this.ds.manager.save(transaction);
    // await this.ds.manager.save(user);
    // end db transaction
  }

  async apply_withdraw_transaction(
    amount: number,
    account_id: string,
    comment: string,
  ) {
    // start db transaction
    const billing_cycle = await this.ds.manager.findOne(BillingCycleDA, {
      where: { status: BillingCycleStatus.OPENED },
    });

    const user = await this.ds.manager.findOne(UserDA, {
      where: { public_id: account_id },
    });

    console.log('Found user: ', user);

    const transaction: Partial<TransactionDA> = this.ds.manager.create(
      TransactionDA,
      {
        account: user,
        type: TransactionType.WITHDRAW,
        credit: amount,
        billing_cycle,
        comment,
      },
    );

    user.balance -= transaction.credit;

    await this.ds.manager.save(transaction);
    await this.ds.manager.save(user);
    // end db transaction
  }

  async apply_payment_transaction(account_id: string) {
    // start db transaction
    // const billing_cycle = await this.ds.manager.findOne(BillingCycleDA, {
    //   where: { status: BillingCycleStatus.OPENED },
    // });
    // const user = await this.ds.manager.findOne(UserDA, {
    //   where: { public_id: account_id },
    // });
    // const transaction: Partial<TransactionDA> = {
    //   account: user,
    //   type: TransactionType.WITHDRAW,
    //   debit: user.balance,
    //   billing_cycle,
    //   comment: `Payment transaction`,
    // };
    // user.balance = 0;
    // await this.ds.manager.save(transaction);
    // await this.ds.manager.save(user);
    // end db transaction
  }
}
