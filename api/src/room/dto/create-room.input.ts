import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field(() => String, { description: 'Caller id' })
  callerId: string;

  @Field(() => String, { description: 'Callee id' })
  calleeId: string;
}
