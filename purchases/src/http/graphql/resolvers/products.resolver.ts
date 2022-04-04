import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from '@http/auth/authorization.guard';
import { CreateProductInput } from '@http/graphql/inputs/create-product.input';
import { Product } from '@http/graphql/models/product';

import { ProductsService } from '@services/products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.findAll();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  createProduct(
    @Args('data')
    { title }: CreateProductInput,
  ) {
    return this.productsService.create({ title });
  }
}
