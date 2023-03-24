import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      }
    },
  );
  app.listen();

  // const app = await NestFactory.create(AppModule);
  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     port: 3001,
  //   },
  // });
  // await app.startAllMicroservices();
  // await app.listen(3001);
}
bootstrap();
