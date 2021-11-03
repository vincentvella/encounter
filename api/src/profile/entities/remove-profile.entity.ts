import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RemoveProfile {
  @Field()
  status: string
}
