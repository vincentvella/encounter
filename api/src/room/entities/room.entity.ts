import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Room as RoomType } from '@prisma/client'

@ObjectType()
export class Room implements RoomType {
  @Field(() => String, { description: 'Room Id' })
  id: string;

  @Field(() => String, { description: 'Room Profile 1 ID' })
  profile1Id: string;

  @Field(() => String, { description: 'Room Profile 2 ID' })
  profile2Id: string;
}
