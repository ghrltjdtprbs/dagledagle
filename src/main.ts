import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filter/global-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { config } from './config';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';

async function bootstrap() {
  console.log('🚀 Starting app...');
  console.log('🧪 Loaded config.database:', config.database);

  let app;
  try {
    app = await NestFactory.create(AppModule);
  } catch (err) {
    console.error('❌ AppModule 생성 중 에러:', err);
    console.error(err?.stack);
    process.exit(1);
  }

  // ✅ 전역 유효성 검사 파이프
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ✅ 전역 성공 응답 인터셉터
  app.useGlobalInterceptors(new SuccessInterceptor());

  // ✅ 전역 예외 필터
  app.useGlobalFilters(new GlobalExceptionFilter());

  // ✅ Swagger 문서 설정
  if (config.swagger) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('DagleDagle API')
      .setDescription('API 명세서입니다.')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
