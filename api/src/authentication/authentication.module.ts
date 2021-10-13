import { Module } from '@nestjs/common';
import { VerificationService } from '../verification/verification.service';
import { AuthenticationController } from './authentication.controller';

@Module({
  providers: [VerificationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule { }