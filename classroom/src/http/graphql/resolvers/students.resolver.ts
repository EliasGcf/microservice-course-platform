import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { EnrollmentsService } from '@services/enrollments.service';
import { StudentsService } from '@services/students.service';

import { AuthorizationGuard } from '@http/auth/authorization.guard';
import { AuthUser, CurrentUser } from '@http/auth/current-user';
import { Enrollment } from '@http/graphql/models/enrollment';
import { Student } from '@http/graphql/models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Student)
  async me(@CurrentUser() user: AuthUser) {
    const student = await this.studentsService.findByAuthUserId(user.sub);
    return student;
  }

  @UseGuards(AuthorizationGuard)
  @Query(() => [Student])
  async students() {
    return await this.studentsService.findAll();
  }

  @ResolveField(() => [Enrollment])
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.findByStudentId(student.id);
  }
}
