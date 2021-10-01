import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AccountModule],
})
export class AppModule { }
