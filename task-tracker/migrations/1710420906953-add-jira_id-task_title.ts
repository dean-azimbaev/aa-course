import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddJiraIdTaskTitle1710420906953 implements MigrationInterface {
  name = 'AddJiraIdTaskTitle1710420906953';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" ADD "jira_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "title" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "jira_id"`);
  }
}
