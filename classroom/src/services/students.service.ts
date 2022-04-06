import { Injectable } from '@nestjs/common';

import { PrismaService } from '@database/prisma/prisma.service';

interface CreateStudentParams {
  auth_user_id: string;
}

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  findByAuthUserId(id: string) {
    return this.prisma.student.findUnique({
      where: { auth_user_id: id },
    });
  }

  findById(id: string) {
    return this.prisma.student.findUnique({ where: { id } });
  }

  findAll() {
    return this.prisma.student.findMany();
  }

  create({ auth_user_id }: CreateStudentParams) {
    return this.prisma.student.create({ data: { auth_user_id } });
  }
}
