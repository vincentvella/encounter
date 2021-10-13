import { Body, Controller, Post } from '@nestjs/common'
import { VerificationService } from '../verification/verification.service';
import { CodeDTO } from './dto/code.dto';
import { VerifyDTO } from './dto/verify.dto';

type VerificationResult = {
  result_id: string
  status: string
  error_text: string
}

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly verificationService: VerificationService) { }

  @Post('verify')
  async verifyAccount(@Body() data: VerifyDTO): Promise<VerificationResult> {
    return this.verificationService.request({ ...data, brand: 'Encounter' })
  }

  @Post('check')
  async checkCode(@Body() data: CodeDTO): Promise<any> {
    return this.verificationService.check(data)
  }
}