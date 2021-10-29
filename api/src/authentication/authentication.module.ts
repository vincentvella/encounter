import { Module } from '@nestjs/common';
import { VerificationService } from '../verification/verification.service';
import { AuthenticationResolver } from './authentication.resolver';

@Module({
  providers: [VerificationService, AuthenticationResolver],
  controllers: [],
})
export class AuthenticationModule { }