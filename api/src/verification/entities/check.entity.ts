import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CheckResponse {
  @Field()
  request_id: string;

  @Field()
  event_id: string;

  @Field()
  status: string;

  @Field()
  price: string;

  @Field()
  currency: string;

  @Field((type) => String, { nullable: true })
  access_token: string;
}
