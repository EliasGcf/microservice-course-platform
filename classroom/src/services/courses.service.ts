import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '@database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.course.findUnique({ where: { id } });
  }

  async findAll() {
    return await this.prisma.course.findMany();
  }

  async create({ title }: CreateCourseParams) {
    const slug = slugify(title, { lower: true });

    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: { slug },
    });

    if (courseWithSameSlug) {
      throw new Error(`Another course with slug '${slug}' already exists.`);
    }

    return await this.prisma.course.create({
      data: { title, slug },
    });
  }
}
