import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para el frontend
  app.enableCors({
    origin: 'http://localhost:5173', // puerto por defecto de Vite/React
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // elimina campos no declarados en el DTO
      forbidNonWhitelisted: true, // lanza error si llegan campos extra
      transform: true,       // convierte tipos automáticamente (ej. string -> number)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
