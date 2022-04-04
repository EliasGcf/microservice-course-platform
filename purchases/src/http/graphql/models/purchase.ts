import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { Product } from '@http/graphql/models/product';

enum PurchasesStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}

registerEnumType(PurchasesStatus, {
  name: 'PurchasesStatus',
  description: 'The status of a purchase',
});

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchasesStatus)
  status: PurchasesStatus;

  @Field(() => Date)
  created_at: Date;

  product_id: string;

  @Field(() => Product)
  product: Product;
}
