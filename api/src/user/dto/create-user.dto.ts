import { User } from ".prisma/client";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserDTO implements Partial<Omit<User, 'id'>> {
  @Field({ nullable: true })
  phoneNumber: string | null

  @Field({ nullable: true })
  fbUserId: string | null

  @Field()
  password: string
}

