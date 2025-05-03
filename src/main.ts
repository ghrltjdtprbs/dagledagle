// src/main.ts
import 'dotenv/config'; 

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filter/global-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from './config'; // 환경별 설정 import


async function bootstrap() {
  console.log('🚀 Starting app...');
  console.log('🧪 Loaded config.database:', config.database);

  let app;
  try {
    app = await NestFactory.create(AppModule);
  } catch (err) {
    console.error('❌ AppModule 생성 중 에러:', err);
    console.error(err?.stack); // ✅ 스택 트레이스까지 출력!
    process.exit(1);
  }

  app.useGlobalFilters(new GlobalExceptionFilter());

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
