import { Test, TestingModule } from '@nestjs/testing';
import { EncounterResolver } from './encounter.resolver';
import { EncounterService } from './encounter.service';

describe('EncounterResolver', () => {
  let resolver: EncounterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncounterResolver, EncounterService],
    }).compile();

    resolver = module.get<EncounterResolver>(EncounterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
