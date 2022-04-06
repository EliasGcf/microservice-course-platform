import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '@database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
  slug?: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  async findBySlug(slug: string) {
    return this.prisma.course.findUnique({ where: { slug } });
  }

  async findAll() {
    return this.prisma.course.findMany();
  }

  async create({
    title,
    slug = slugify(title, { lower: true }),
  }: CreateCourseParams) {
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
