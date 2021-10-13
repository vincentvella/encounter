import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AccountModule],
})
export class AppModule { }
