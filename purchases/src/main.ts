import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3333);

  console.log('Purchases application is running on: http://localhost:3333');
}

bootstrap();
