import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';

import { PurchaseController } from '@messaging/controllers/purchase.controller';

import { CoursesService } from '@services/courses.service';
import { EnrollmentsService } from '@services/enrollments.service';
import { StudentsService } from '@services/students.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchaseController],
  providers: [CoursesService, EnrollmentsService, StudentsService],
})
export class MessagingModule {}
