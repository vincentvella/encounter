import { InputType, Int, Field, ObjectType, Float } from '@nestjs/graphql';

@InputType()
export class SharedAttributeInput {
  @Field(() => Boolean, { description: 'firstName' })
  firstName: boolean

  @Field(() => Boolean, { description: 'lastName' })
  lastName: boolean

  @Field(() => Boolean, { description: 'email' })
  email: boolean

  @Field(() => Boolean, { description: 'phoneNumber' })
  phoneNumber: boolean
}

@InputType()
export class CreateFeedbackInput {
  @Field(() => String, { description: 'Room ID' })
  roomId: string;

  @Field(() => Boolean, { description: 'Whether someone wants to continue the encounter' })
  continuation: boolean

  @Field(() => Float, { defaultValue: 0, description: 'Peer Rating' })
  peerRating: number

  @Field(() => Float, { defaultValue: 0, description: 'Call Quality' })
  callQuality: number

  @Field(() => SharedAttributeInput, { description: 'Shared Attributes' })
  sharedAttributes: SharedAttributeInput
}
