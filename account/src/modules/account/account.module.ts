import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  providers: [AccountService],
  exports: [AccountController],
})
export class AccountModule { }