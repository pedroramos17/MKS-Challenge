import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

const isProduction = () => process.env.NODE_ENV != 'development';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async () => ({
    type: 'postgres',

    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,

    entities: [__dirname + '/../**/*.entity.{ts,js}'],

    migrationsTableName: 'migrations',
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],

    ssl: isProduction(),

    cli: {
      migrationsDir: __dirname + '/../database/migrations',
    },

    synchronize: true,
  }),
};
