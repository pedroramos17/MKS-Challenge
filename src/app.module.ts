import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-ioredis-yet';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Movie } from './movies/entities/movie.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: parseInt(configService.get('POSTGRES_PORT')),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [User, Movie],
        migrations: [__dirname + './database/migrations/*{.ts,.js}'],
        // do NOT use synchronize: true in production
        synchronize: !configService.get('IS_PROD'),
      }),
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: parseInt(configService.get('REDIS_PORT')),
      }),
      inject: [ConfigService],
    }),
    MoviesModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
