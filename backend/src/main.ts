import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
 
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
 
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:3000'];
 
  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  });
 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
 
  const port = process.env.PORT ?? 3001;
  await app.listen(port);
}
 
bootstrap();
