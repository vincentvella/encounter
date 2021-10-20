import { Module } from '@nestjs/common';
import { AccountModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [PrismaModule, AccountModule, AuthenticationModule, ProfileModule],
})
export class AppModule { }
