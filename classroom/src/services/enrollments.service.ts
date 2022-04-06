import { Injectable } from '@nestjs/common';

import { PrismaService } from '@database/prisma/prisma.service';

interface FindByCourseIdAndStudentIdParams {
  course_id: string;
  student_id: string;
}

interface CreateEnrollmentParams {
  course_id: string;
  student_id: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async findByCourseIdAndStudentId({
    course_id,
    student_id,
  }: FindByCourseIdAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: { course_id, student_id, canceled_at: null },
    });
  }

  async findByStudentId(student_id: string) {
    return this.prisma.enrollment.findMany({
      where: { student_id, canceled_at: null },
      orderBy: { created_at: 'desc' },
    });
  }

  async findAll() {
    return this.prisma.enrollment.findMany({
      where: { canceled_at: null },
      orderBy: { created_at: 'desc' },
    });
  }

  async create({ course_id, student_id }: CreateEnrollmentParams) {
    return this.prisma.enrollment.create({
      data: { student_id, course_id },
    });
  }
}
