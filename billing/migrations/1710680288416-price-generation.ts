import { MigrationInterface, QueryRunner } from 'typeorm';

export class PriceGeneration1710680288416 implements MigrationInterface {
  name = 'PriceGeneration1710680288416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "price" SET DEFAULT floor(random() * 20 + 1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "price" DROP DEFAULT`,
    );
  }
}
