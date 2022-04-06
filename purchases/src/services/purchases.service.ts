import { Injectable } from '@nestjs/common';

import { PrismaService } from '@database/prisma/prisma.service';

import { KafkaService } from '@messaging/kafka.service';

interface CreatePurchaseParams {
  customer_id: string;
  product_id: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService, private kafka: KafkaService) {}

  async findAll() {
    return this.prisma.purchase.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  findByCustomerId(customer_id: string) {
    return this.prisma.purchase.findMany({
      where: { customer_id },
      orderBy: { created_at: 'desc' },
    });
  }

  async create({ customer_id, product_id }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: { id: product_id },
    });

    if (!product) {
      throw new Error('Product not found.');
    }

    const purchase = this.prisma.purchase.create({
      data: {
        customer_id,
        product_id,
      },
    });

    const customer = await this.prisma.customer.findUnique({
      where: { id: customer_id },
    });

    this.kafka.emit('purchases.new-purchase', {
      customer: {
        auth_user_id: customer.auth_user_id,
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
    });

    return purchase;
  }
}
