import * as argon2 from 'argon2';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { User } from 'src/user/entities/user.entity';
import { UserService } from '../user/user.service';
import { VerificationService } from 'src/verification/verification.service';
import { RequestResponse } from 'src/verification/entities/request.entity';
import { ApolloError } from 'apollo-server-errors';

type VerificationRequestCacheConfig = {
  /**
   * Phone Number
   */
  number: string
  /**
   * Request ID
   */
  requestId: string
  /**
   * PW Hash
   */
  password: string
}

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private verificationService: VerificationService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async validateUser(phoneNumber: string, password?: string): Promise<User | null> {
    const user = await this.userService.findByNumber(phoneNumber)
    if (user) {
      // If user passes password property, this function can be used to validate password
      if (password) {
        const passwordValid = await argon2.verify(user.password, password)
        if (passwordValid) {
          return user
        }
        throw new ApolloError('Unauthorized', '401')
      }
      return user
    }
    return null
  }

  async requestVerificationCode(number: string, password: string) {
    try {
      // Check to see if user has an existing request
      const passwordHash = await argon2.hash(password)
      // TODO: remove this check as it potentially exposes whether a user has an acct or not
      const user = await this.validateUser(number)
      if (!user) {
        const verificationRequest = await this.verificationService.request({ number, brand: 'Encounter' })
        await this.cacheVerificationRequest({
          number,
          requestId: verificationRequest.request_id,
          password: passwordHash
        })
        return verificationRequest
      }
      return {
        request_id: '0',
        status: '0'
      } as RequestResponse
    } catch (err) {
      console.log('Error Requesting Code', err)
    }
    return null
  }

  async createUser({ phoneNumber = null, password, fbUserId = null }: Partial<User>) {
    return this.userService.insertOne({ phoneNumber, password, fbUserId })
  }

  cacheVerificationRequest(config: VerificationRequestCacheConfig) {
    return this.cacheManager.set(config.requestId, `${config.number}:::${config.password}`, { ttl: 3600 })
  }

  async getRequestFromCache(requestId: string) {
    const cacheValue: string = await this.cacheManager.get(requestId)
    const [phoneNumber, passwordHash] = cacheValue.split(':::')
    return {
      phoneNumber, password: passwordHash
    }
  }

  async login(user: User) {
    const payload = {
      phoneNumber: user.phoneNumber,
      fbUserId: user.fbUserId,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}