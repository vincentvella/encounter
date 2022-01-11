import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EncounterService } from './encounter.service';
import { Encounter } from './entities/encounter.entity';
import { CreateEncounterInput } from './dto/create-encounter.input';
import { UpdateEncounterInput } from './dto/update-encounter.input';

@Resolver(() => Encounter)
export class EncounterResolver {
  constructor(private readonly encounterService: EncounterService) {}

  @Mutation(() => Encounter)
  createEncounter(@Args('createEncounterInput') createEncounterInput: CreateEncounterInput) {
    return this.encounterService.create(createEncounterInput);
  }

  @Query(() => [Encounter], { name: 'encounter' })
  findAll() {
    return this.encounterService.findAll();
  }

  @Query(() => Encounter, { name: 'encounter' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.encounterService.findOne(id);
  }

  @Mutation(() => Encounter)
  updateEncounter(@Args('updateEncounterInput') updateEncounterInput: UpdateEncounterInput) {
    return this.encounterService.update(updateEncounterInput.id, updateEncounterInput);
  }

  @Mutation(() => Encounter)
  removeEncounter(@Args('id', { type: () => Int }) id: number) {
    return this.encounterService.remove(id);
  }
}
