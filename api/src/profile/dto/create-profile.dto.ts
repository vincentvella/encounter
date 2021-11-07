import { Profile } from ".prisma/client";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateProfileDto implements Omit<Profile, 'id' | 'userId'> {
  @Field()
  email: string

  @Field()
  firstName: string

  @Field()
  lastName: string
}
