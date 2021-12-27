import { Test, TestingModule } from '@nestjs/testing';
import { UserWaitingResolver } from './user-waiting.resolver';
import { UserWaitingService } from './user-waiting.service';

describe('UserWaitingResolver', () => {
  let resolver: UserWaitingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserWaitingResolver, UserWaitingService],
    }).compile();

    resolver = module.get<UserWaitingResolver>(UserWaitingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
