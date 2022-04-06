import { Module } from '@nestjs/common';

import { KafkaService } from '@messaging/kafka.service';

@Module({
  providers: [KafkaService],
  exports: [KafkaService],
})
export class MessagingModule {}
