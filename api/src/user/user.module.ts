import { Module } from '@nestjs/common';
import { VerificationService } from '../verification/verification.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserService, VerificationService, UserResolver],
  controllers: [],
})
export class UserModule { }