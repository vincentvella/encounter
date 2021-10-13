import { Account } from '.prisma/client';
import { Body, Controller, Post } from '@nestjs/common'
import { VerificationService } from '../verification/verification.service';
import { AccountDTO } from './dto/account.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService, private readonly verificationService: VerificationService) { }

  @Post('create')
  async createAccount(@Body() data: AccountDTO): Promise<Account> {
    return this.accountService.insertOne(data)
  }
}