import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskMissingColumns1710691630882 implements MigrationInterface {
    name = 'TaskMissingColumns1710691630882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "title" character varying`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "UQ_f1859177f417079a2f185f3082e" UNIQUE ("public_id")`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "price" SET DEFAULT floor(random() * 20 + 1)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "price" SET DEFAULT floor(((random() * (20)) + (1)))`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "UQ_f1859177f417079a2f185f3082e"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "comment" character varying`);
    }

}
