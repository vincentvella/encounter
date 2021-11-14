import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { User } from 'src/user/entities/user.entity';
import { AuthenticationService } from '../authentication.service';
import { ApolloError } from 'apollo-server-errors';

export type JWTPayload = Pick<User, 'fbUserId' | 'phoneNumber' | 'role'> & {
  sub: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JWTPayload) {
    const user = await this.authenticationService.validateUser(payload.phoneNumber)
    if (!user) {
      throw new ApolloError('User not found', '404')
    }
    return {
      phoneNumber: payload.phoneNumber,
      fbUserId: payload.fbUserId,
      id: payload.sub,
      role: payload.role
    }
  }
}