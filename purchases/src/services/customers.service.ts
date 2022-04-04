import { Injectable } from '@nestjs/common';

import { PrismaService } from '@database/prisma/prisma.service';

interface CreateCustomerParams {
  auth_user_id: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findByAuthUserId(id: string) {
    return this.prisma.customer.findUnique({
      where: {
        auth_user_id: id,
      },
    });
  }

  async create({ auth_user_id }: CreateCustomerParams) {
    return this.prisma.customer.create({
      data: {
        auth_user_id,
      },
    });
  }
}
