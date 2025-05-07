// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import configuration from './config/config.default';
import localConfig   from './config/config.local';
import prodConfig    from './config/config.prod';

import { AuthModule }         from './domain/auth/auth.module';
import { UserModule }         from './domain/user/user.module';
import { PostModule }         from './domain/post/post.module';
import { CommentModule }      from './domain/comment/comment.module';
import { LikeModule }         from './domain/like/like.module';
import { NotificationModule } from './domain/notification/notification.module';
import { HealthModule }       from './health/health.module';

import { AppController } from './app.controller';
import { AppService }    from './app.service';

@Module({
  imports: [
    // 환경별 .env 파일과 설정 로드
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'local' ? '.env' : undefined,
      ignoreEnvFile: process.env.NODE_ENV !== 'local',
      load: [
        configuration,
        process.env.NODE_ENV === 'local' ? localConfig : prodConfig,
      ],
    }),

    EventEmitterModule.forRoot(),

    // TypeORM 비동기 설정
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
          // 로컬에서는 SSL 비활성화, 그 외(prod 등)에서는 SSL 활성화
          ssl: isLocal
            ? false
            : { rejectUnauthorized: false },
        };
      },
    }),

    // 애플리케이션 도메인 모듈들
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
export class AppModule {}
