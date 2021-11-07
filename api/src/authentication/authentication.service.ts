import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async validateUser(phoneNumber: string): Promise<User | null> {
    const user = await this.userService.findByNumber(phoneNumber)
    if (user) {
      return user
    }
    return null
  }

  async login(user: User) {
    const payload = { phoneNumber: user.phoneNumber, fbUserId: user.fbUserId, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}