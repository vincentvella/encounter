import { Module } from '@nestjs/common';
import { UserWaitingService } from './user-waiting.service';
import { UserWaitingResolver } from './user-waiting.resolver';

@Module({
  providers: [UserWaitingResolver, UserWaitingService]
})
export class UserWaitingModule {}
