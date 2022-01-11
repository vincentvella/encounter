import { CreateEncounterInput } from './create-encounter.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEncounterInput extends PartialType(CreateEncounterInput) {
  @Field(() => Int)
  id: number;
}
