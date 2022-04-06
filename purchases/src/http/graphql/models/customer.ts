import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

import { Purchase } from '@http/graphql/models/purchase';

@ObjectType('User')
@Directive('@key(fields: "auth_user_id")')
export class Customer {
  id: string;

  @Field(() => ID)
  auth_user_id: string;

  @Field(() => [Purchase])
  purchases: Purchase[];
}
