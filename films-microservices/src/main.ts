import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3002,
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
