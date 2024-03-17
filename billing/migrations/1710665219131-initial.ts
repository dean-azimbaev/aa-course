import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1710665219131 implements MigrationInterface {
  name = 'Initial1710665219131';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('WORKER', 'MANAGER', 'ADMIN')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL, "balance" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "debit" numeric(20,2) NOT NULL DEFAULT '0', "credit" numeric(20,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "public_id" uuid NOT NULL, "price" integer NOT NULL, "comment" character varying, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."billing_cycle_status_enum" AS ENUM('CLOSED', 'OPENED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "billing_cycle" ("id" SERIAL NOT NULL, "status" "public"."billing_cycle_status_enum" NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "end_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d5931a1177eb6ed37882f8ad2f3" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "billing_cycle"`);
    await queryRunner.query(`DROP TYPE "public"."billing_cycle_status_enum"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
