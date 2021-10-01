import { Account } from '.prisma/client';
import { Body, Controller, Post } from '@nestjs/common'
import { AccountDTO } from './account.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post('create')
  async createAccount(@Body() data: AccountDTO): Promise<Account> {
    return this.accountService.insertOne(data)
  }
}