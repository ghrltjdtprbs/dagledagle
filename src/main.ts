// src/main.ts

import 'dotenv/config';
import { NestFactory }    from '@nestjs/core';
import { ConfigService }  from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule }      from './app.module';
import { GlobalExceptionFilter }   from './common/filter/global-exception.filter';
import { SuccessInterceptor }      from './common/interceptors/success.interceptor';

async function bootstrap() {
  Logger.log('🚀 Starting app...');

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // 전역 유효성 검사 파이프
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // 전역 성공 인터셉터
  app.useGlobalInterceptors(new SuccessInterceptor());

  // 전역 예외 필터
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Swagger 설정 (환경별 swagger 플래그 확인)
  if (configService.get<boolean>('swagger')) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('DagleDagle API')
      .setDescription('API 명세서입니다.')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app as any, swaggerConfig);
    SwaggerModule.setup('api-docs', app as any, document);
    Logger.log('📑 Swagger UI enabled at /api-docs');
  }

  // 포트 설정 (필요시 env 또는 default 80)
  const port = configService.get<number>('server.port') ?? 80;
  await app.listen(port);
}

bootstrap();
