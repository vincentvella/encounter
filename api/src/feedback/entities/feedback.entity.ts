import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Feedback {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
