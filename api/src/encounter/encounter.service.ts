import { Injectable } from '@nestjs/common';
import { CreateEncounterInput } from './dto/create-encounter.input';
import { UpdateEncounterInput } from './dto/update-encounter.input';

@Injectable()
export class EncounterService {
  create(createEncounterInput: CreateEncounterInput) {
    return 'This action adds a new encounter';
  }

  findAll() {
    return `This action returns all encounter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} encounter`;
  }

  update(id: number, updateEncounterInput: UpdateEncounterInput) {
    return `This action updates a #${id} encounter`;
  }

  remove(id: number) {
    return `This action removes a #${id} encounter`;
  }
}
