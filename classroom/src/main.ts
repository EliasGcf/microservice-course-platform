import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092'],
      },
    },
  });

  await app.startAllMicroservices();

  console.log('[Classroom] Microservice running!');

  await app.listen(3334);

  console.log('[Classroom] is running on: http://localhost:3334');
}

bootstrap();
