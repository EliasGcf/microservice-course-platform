import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver, ResolveReference } from '@nestjs/graphql';

import { AuthorizationGuard } from '@http/auth/authorization.guard';
import { CurrentUser, AuthUser } from '@http/auth/current-user';
import { Customer } from '@http/graphql/models/customer';
import { Purchase } from '@http/graphql/models/purchase';

import { CustomersService } from '@services/customers.service';
import { PurchasesService } from '@services/purchases.service';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.findByAuthUserId(user.sub);
  }

  @ResolveField(() => [Purchase])
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.findByCustomerId(customer.id);
  }

  @ResolveReference()
  resolveReference(reference: { auth_user_id: string }) {
    return this.customersService.findByAuthUserId(reference.auth_user_id);
  }
}
