import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEncounterInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
