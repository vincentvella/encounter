import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { User } from 'src/user/entities/user.entity';

export type JWTPayload = Pick<User, 'fbUserId' | 'phoneNumber'> & {
  sub: string
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JWTPayload) {
    return { phoneNumber: payload.phoneNumber, fbUserId: payload.fbUserId, id: payload.sub }
  }
}