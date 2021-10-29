import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class RequestResponse {
  @Field()
  request_id: string

  @Field()
  status: string
}