import { Module } from '@nestjs/common';
import { EncounterService } from './encounter.service';
import { EncounterResolver } from './encounter.resolver';

@Module({
  providers: [EncounterResolver, EncounterService]
})
export class EncounterModule {}
