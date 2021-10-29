import { User as UserType } from '.prisma/client'
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User implements UserType {
  @Field()
  id: string

  @Field((type) => String, { nullable: true })
  fbUserId: string | null

  @Field((type) => String, { nullable: true })
  phoneNumber: string | null
}