import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateProfileDto {
  @Field()
  email: string

  @Field()
  firstName: string

  @Field()
  lastName: string
}
