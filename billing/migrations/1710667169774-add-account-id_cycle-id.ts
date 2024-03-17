import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAccountIdCycleId1710667169774 implements MigrationInterface {
  name = 'AddAccountIdCycleId1710667169774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transaction" ADD "account_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "billing_cycle_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_e2652fa8c16723c83a00fb9b17e" FOREIGN KEY ("account_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_4ee5c26d2607c06a583f6585c3f" FOREIGN KEY ("billing_cycle_id") REFERENCES "billing_cycle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_4ee5c26d2607c06a583f6585c3f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_e2652fa8c16723c83a00fb9b17e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP COLUMN "billing_cycle_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP COLUMN "account_id"`,
    );
  }
}
