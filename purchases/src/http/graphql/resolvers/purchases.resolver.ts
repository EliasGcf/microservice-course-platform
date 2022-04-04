import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { AuthorizationGuard } from '@http/auth/authorization.guard';
import { AuthUser, CurrentUser } from '@http/auth/current-user';
import { CreatePurchaseInput } from '@http/graphql/inputs/create-purchase.input';
import { Product } from '@http/graphql/models/product';
import { Purchase } from '@http/graphql/models/purchase';

import { CustomersService } from '@services/customers.service';
import { ProductsService } from '@services/products.service';
import { PurchasesService } from '@services/purchases.service';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customersService: CustomersService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Purchase])
  purchases() {
    return this.purchasesService.findAll();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Purchase)
  async createPurchase(
    @CurrentUser() user: AuthUser,
    @Args('data') { product_id }: CreatePurchaseInput,
  ) {
    let customer = await this.customersService.findByAuthUserId(user.sub);

    if (!customer) {
      customer = await this.customersService.create({
        auth_user_id: user.sub,
      });
    }

    return this.purchasesService.create({
      product_id,
      customer_id: customer.id,
    });
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productsService.findById(purchase.product_id);
  }
}
