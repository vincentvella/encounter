import { Profile as ProfileType } from '.prisma/client'
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Profile implements ProfileType {
  @Field()
  id: string

  @Field()
  userId: string

  @Field()
  email: string


  @Field()
  firstName: string

  @Field()
  lastName: string
}
