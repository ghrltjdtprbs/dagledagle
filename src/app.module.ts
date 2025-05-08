// src/app.module.ts

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import configuration from './config/config.default';
import localConfig   from './config/config.local';
import prodConfig    from './config/config.prod';
import devConfig     from './config/config.dev';

import { AuthModule }         from './domain/auth/auth.module';
import { UserModule }         from './domain/user/user.module';
import { PostModule }         from './domain/post/post.module';
import { CommentModule }      from './domain/comment/comment.module';
import { LikeModule }         from './domain/like/like.module';
import { NotificationModule } from './domain/notification/notification.module';
import { HealthModule }       from './health/health.module';
import { LoggerMiddleware }   from './common/middleware/logger.middleware';

import { AppController } from './app.controller';
import { AppService }    from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'local' ? '.env' : undefined,
      ignoreEnvFile: process.env.NODE_ENV !== 'local',
      load: [
        configuration,
        process.env.NODE_ENV === 'local'
          ? localConfig
          : process.env.NODE_ENV === 'dev'
            ? devConfig
            : prodConfig,
      ],
    }),

    EventEmitterModule.forRoot(),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject:  [ConfigService],
      useFactory: (config: ConfigService) => {
        const isLocal = config.get<string>('NODE_ENV') === 'local';
        return {
          type:       'postgres',
          host:       config.get<string>('DB_HOST'),
          port:       config.get<number>('DB_PORT'),
          username:   config.get<string>('DB_USERNAME'),
          password:   config.get<string>('DB_PASSWORD'),
          database:   config.get<string>('DB_DATABASE'),
          entities:   [__dirname + '/**/*.entity.{ts,js}'],
          synchronize:config.get<boolean>('DB_SYNCHRONIZE', false),
          logging:    config.get<boolean>('DB_LOGGING', false),
          ssl: isLocal
            ? false
            : { rejectUnauthorized: false },
        };
      },
    }),

    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    LikeModule,
    NotificationModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers:   [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    if (process.env.NODE_ENV === 'dev') {
      consumer.apply(LoggerMiddleware).forRoutes('*');
    }
  }
}
