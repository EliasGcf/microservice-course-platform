import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3334);

  console.log('Classroom application is running on: http://localhost:3334');
}
bootstrap();
