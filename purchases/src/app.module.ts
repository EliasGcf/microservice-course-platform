import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@database/database.module';

import { HttpModule } from '@http/http.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
