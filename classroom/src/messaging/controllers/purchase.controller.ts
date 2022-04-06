import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CoursesService } from '@services/courses.service';
import { EnrollmentsService } from '@services/enrollments.service';
import { StudentsService } from '@services/students.service';

interface PurchaseCreatedPayload {
  customer: {
    auth_user_id: string;
  };

  product: {
    id: string;
    title: string;
    slug: string;
  };
}

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.findByAuthUserId(
      payload.customer.auth_user_id,
    );

    if (!student) {
      student = await this.studentsService.create({
        auth_user_id: payload.customer.auth_user_id,
      });
    }

    let course = await this.coursesService.findBySlug(payload.product.slug);

    if (!course) {
      course = await this.coursesService.create({
        title: payload.product.title,
        slug: payload.product.slug,
      });
    }

    await this.enrollmentsService.create({
      course_id: course.id,
      student_id: student.id,
    });
  }
}
