import { User } from '.prisma/client';
import { Body, Controller, Post } from '@nestjs/common'
import { VerificationService } from '../verification/verification.service';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly accountService: UserService, private readonly verificationService: VerificationService) { }

  @Post('create')
  async createUser(@Body() data: UserDTO): Promise<User> {
    return this.accountService.insertOne(data)
  }
}