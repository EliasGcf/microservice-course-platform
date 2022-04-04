import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CoursesService } from '@services/courses.service';
import { EnrollmentsService } from '@services/enrollments.service';
import { StudentsService } from '@services/students.service';

import { Course } from '@http/graphql/models/course';
import { Enrollment } from '@http/graphql/models/enrollment';
import { Student } from '@http/graphql/models/student';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) {}

  @Query(() => [Enrollment])
  enrollments() {
    return this.enrollmentsService.findAll();
  }

  @ResolveField(() => Student)
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.findById(enrollment.student_id);
  }

  @ResolveField(() => Course)
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.findById(enrollment.course_id);
  }
}
