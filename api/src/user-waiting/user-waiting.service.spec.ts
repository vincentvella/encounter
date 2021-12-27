import { Test, TestingModule } from '@nestjs/testing';
import { UserWaitingService } from './user-waiting.service';

describe('UserWaitingService', () => {
  let service: UserWaitingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserWaitingService],
    }).compile();

    service = module.get<UserWaitingService>(UserWaitingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
