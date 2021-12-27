import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PendingRoom {
  @Field(() => Boolean)
  waiting: boolean;
}
