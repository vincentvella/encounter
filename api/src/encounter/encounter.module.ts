import { Module } from '@nestjs/common';
import { EncounterService } from './encounter.service';
import { EncounterResolver } from './encounter.resolver';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  providers: [EncounterResolver, EncounterService, ProfileService]
})
export class EncounterModule { }
