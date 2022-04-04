import { Injectable } from '@nestjs/common';

import { PrismaService } from '@database/prisma/prisma.service';

interface findByCourseIdAndStudentIdParams {
  course_id: string;
  student_id: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async findByCourseIdAndStudentId({
    course_id,
    student_id,
  }: findByCourseIdAndStudentIdParams) {
    return await this.prisma.enrollment.findFirst({
      where: { course_id, student_id, canceled_at: null },
    });
  }

  async findByStudentId(student_id: string) {
    return await this.prisma.enrollment.findMany({
      where: { student_id, canceled_at: null },
      orderBy: { created_at: 'desc' },
    });
  }

  async findAll() {
    return await this.prisma.enrollment.findMany({
      where: { canceled_at: null },
      orderBy: { created_at: 'desc' },
    });
  }
}
