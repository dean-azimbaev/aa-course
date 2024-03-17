export const dbConfig = () => ({
  databases: {
    pg: {
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
      autoLoadEntities: true,
      migrations: ['dist/migrations/*{.js,.ts}'],
      migrationsRun: true,
      migrationsTableName: 'migrations_history',
      logging: true
    },
  },
});
