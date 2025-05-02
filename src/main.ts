import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filter/global-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. 전역 예외 필터 등록
  app.useGlobalFilters(new GlobalExceptionFilter());

  // 2. Swagger 문서 설정
  const config = new DocumentBuilder()
    .setTitle('DagleDagle API')
    .setDescription('API 명세서입니다.')
    .setVersion('1.0')
    .addBearerAuth() // JWT 인증 추가
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // http://localhost:3000/api-docs

  // 3. 앱 실행
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
