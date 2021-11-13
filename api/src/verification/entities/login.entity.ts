import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Login {
  @Field((type) => String, { nullable: true })
  access_token: string;
}
