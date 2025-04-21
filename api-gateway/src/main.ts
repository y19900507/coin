import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 启用全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // 启用 Helmet 安全头
  app.use(helmet());

  // 配置跨域
  app.enableCors();

  // 配置 Swagger 文档
  const config = new DocumentBuilder()
    .setTitle('BitLuna API')
    .setDescription('BitLuna 交易所 API 文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 启动服务
  await app.listen(3000);
  console.log(`API Gateway running on: ${await app.getUrl()}`);
}
bootstrap(); 