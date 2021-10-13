import { Module } from '@nestjs/common';
import { VerificationService } from '../verification/verification.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  providers: [AccountService, VerificationService],
  controllers: [AccountController],
})
export class AccountModule { }