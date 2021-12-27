import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field(() => String, { description: 'Matcher id' })
  profile1Id: string;

  @Field(() => String, { description: 'Matchee id' })
  profile2Id: string;
}
