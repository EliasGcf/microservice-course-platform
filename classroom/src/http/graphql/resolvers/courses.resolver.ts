import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoursesService } from '@services/courses.service';
import { EnrollmentsService } from '@services/enrollments.service';
import { StudentsService } from '@services/students.service';

import { AuthorizationGuard } from '@http/auth/authorization.guard';
import { AuthUser, CurrentUser } from '@http/auth/current-user';
import { CreateCourseInput } from '@http/graphql/inputs/create-course.input';
import { Course } from '@http/graphql/models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Course])
  courses() {
    return this.coursesService.findAll();
  }

  @UseGuards(AuthorizationGuard)
  @Query(() => Course)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentsService.findByAuthUserId(user.sub);

    if (!student) {
      throw new Error('Student not found.');
    }

    const enrollment = await this.enrollmentsService.findByCourseIdAndStudentId(
      {
        course_id: id,
        student_id: student.id,
      },
    );

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.coursesService.findById(id);
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Course)
  createCourse(@Args('data') { title }: CreateCourseInput) {
    return this.coursesService.create({ title });
  }
}
