import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

import { Enrollment } from '@http/graphql/models/enrollment';

@ObjectType('User')
@Directive('@extends')
@Directive('@key(fields: "auth_user_id")')
export class Student {
  id: string;

  @Field(() => ID)
  @Directive('@external')
  auth_user_id: string;

  @Field(() => [Enrollment])
  enrollments: Enrollment[];
}
