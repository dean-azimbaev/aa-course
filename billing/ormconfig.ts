import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export const dataSource = new DataSource({
  //@ts-ignore
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  entities: [
    'dist/src/**/data-access/*.schema{.ts,.js}',
    'dist/src/**/data-access/schemas/*.schema{.ts,.js}',
  ],
  migrationsTableName: 'migrations_history',
});
