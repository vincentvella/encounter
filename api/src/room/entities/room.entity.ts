import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Room as RoomType } from '@prisma/client'
import { Profile } from 'src/profile/entities/profile.entity';

@ObjectType()
export class Room implements RoomType {
  @Field(() => String, { description: 'Room Id' })
  id: string;

  @Field(() => String, { description: 'Caller ID' })
  callerId: string;

  @Field(() => String, { description: 'Callee ID' })
  calleeId: string;

  @Field(() => Profile, { description: 'Caller' })
  caller: Profile;

  @Field(() => Profile, { description: 'Callee' })
  callee: Profile;

  @Field(() => Date, { nullable: true, description: 'When call ended' })
  ended: Date
}
