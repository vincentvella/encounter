import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Feedback {
  @Field(() => String, { description: 'Encounter ID' })
  id: string;
}
