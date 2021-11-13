import { User as UserType } from '.prisma/client'
import { Field, ObjectType } from '@nestjs/graphql';
import { RoleType } from 'src/authorization/role.enum';

@ObjectType()
export class User implements UserType {
  @Field()
  id: string

  @Field((type) => String, { nullable: true })
  fbUserId: string | null

  @Field((type) => String, { nullable: true })
  phoneNumber: string | null

  @Field()
  role: RoleType

  @Field()
  password: string
}
