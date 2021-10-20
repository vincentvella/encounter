import { Module } from '@nestjs/common';
import { VerificationService } from '../verification/verification.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, VerificationService],
  controllers: [UserController],
})
export class UserModule { }