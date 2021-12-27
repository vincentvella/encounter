import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Profile } from 'src/profile/entities/profile.entity';

@ObjectType()
export class UserWaiting {
  @Field(() => Int, { description: 'User Waiting ID' })
  id: number;

  @Field(() => Profile)
  profile: Profile

  @Field(() => String)
  profileId: string

  @Field(() => String)
  queuedAt: string
}
