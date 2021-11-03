import { CACHE_MANAGER, Inject } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { Cache } from "cache-manager";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { TokenResponse } from "src/verification/entities/authToken.entity";
import { CheckResponse } from "src/verification/entities/check.entity";
import { RequestResponse } from "src/verification/entities/request.entity";
import { VerificationService } from "src/verification/verification.service";
import { AuthenticationService } from "./authentication.service";
import { Public } from "./public.strategy";

@Resolver(of => RequestResponse)
export class AuthenticationResolver {
  constructor(
    private readonly verificationService: VerificationService,
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  @Public()
  @Query((returns) => RequestResponse, { nullable: true })
  async requestCode(@Args('number', { nullable: false }) number: string) {
    try {
      const verificationRequest = await this.verificationService.request({ number, brand: 'Encounter' })
      await this.cacheManager.set(verificationRequest.request_id, number, { ttl: 3600 })
      return verificationRequest
    } catch (err) {
      return null
    }
  }

  private async returnOrCreateUser(phoneNumber: string) {
    try {
      const user = await this.authenticationService.validateUser(phoneNumber)
      if (!user) throw new Error('User not found')
      return user
    } catch (err) {
      // User not yet created
      const user = await this.userService.insertOne({ phoneNumber, fbUserId: null })
      return user
    }
  }

  @Public()
  @Query((returns) => CheckResponse, { nullable: true })
  async verifyCode(
    @Args('request_id', { nullable: false }) request_id: string,
    @Args('code', { nullable: false }) code: string
  ) {
    try {
      const checkResponse = await this.verificationService.check({ request_id, code })
      if (checkResponse.request_id) {
        const phoneNumber: string = await this.cacheManager.get(checkResponse.request_id)
        // Use derived phone number instead of allowing it to be passed in as a parameter
        if (phoneNumber) {
          // Once we've verified the phone number we can create a user
          const user = await this.returnOrCreateUser(phoneNumber)
          const { access_token } = await this.authenticationService.login(user)
          return { ...checkResponse, access_token }
        }
      }
    } catch (err) {
      return null
    }
    return null
  }
}