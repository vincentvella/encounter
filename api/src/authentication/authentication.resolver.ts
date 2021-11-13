import { Args, createUnionType, Query, Resolver } from "@nestjs/graphql";
import { ApolloError } from "apollo-server-errors";
import { CheckResponse } from "src/verification/entities/check.entity";
import { RequestResponse } from "src/verification/entities/request.entity";
import { VerificationService } from "src/verification/verification.service";
import { Login } from "src/verification/entities/login.entity";
import { AuthenticationService } from "./authentication.service";
import { Public } from "./strategies/public.strategy";

export const SignInUnion = createUnionType({
  name: 'SignUp',
  types: () => [RequestResponse, Login],
  resolveType: (value) => {
    if (value?.auth_token) {
      return Login
    }
    return RequestResponse
  }
});

@Resolver(of => RequestResponse)
export class AuthenticationResolver {
  constructor(
    private readonly verificationService: VerificationService,
    private readonly authenticationService: AuthenticationService,
  ) { }

  /**
   * Login Resolver
   * @param number 
   * @param password 
   * @returns Login! || ApolloError(401)
   * We always return a 401 to ensure we don't offer a way to allow people to see if someone has an acct with us
   */
  @Public()
  @Query((returns) => Login)
  async login(@Args('number') number: string, @Args('password') password: string) {
    try {
      const user = await this.authenticationService.validateUser(number, password)
      if (!user) {
        return new ApolloError('Unauthorized', '401')
      }
      return this.authenticationService.login(user)
    } catch (err) {
      return new ApolloError('Unauthorized', '401')
    }
  }

  /**
   * Sign Up Resolver
   * First we try to sign in the user with the creds
   * If sign in is successful we'll redirect to homepage
   * If we can't find the user, we'll request a verification code sent to their phone
   * If the user is found but the password is incorrect, we'll send a 401 (which we'll present as a failure to send code)
   * @param number 
   * @param password 
   * @returns Login || User || ApolloError(401)
   */
  @Public()
  @Query((returns) => SignInUnion, { nullable: true })
  async signUp(@Args('number', { nullable: false }) number: string, @Args('password', { nullable: false }) password: string) {
    try {
      const user = await this.authenticationService.validateUser(number, password)
      if (!user) {
        return this.authenticationService.requestVerificationCode(number, password)
      }
      return this.authenticationService.login(user)
    } catch (err) {
      throw new ApolloError('Unauthorized', '401')
    }
  }


  /**
   * Verification Code Resolver
   * Checks the code with the verification service
   * Uses the request id to fetch creds from redis
   * Creates a user
   * Returns a signed auth token to the user
   * @param request_id 
   * @param code 
   * @returns Login
   */
  @Public()
  @Query((returns) => CheckResponse, { nullable: true })
  async verifyCode(
    @Args('request_id', { nullable: false }) request_id: string,
    @Args('code', { nullable: false }) code: string
  ) {
    try {
      const checkResponse = await this.verificationService.check({ request_id, code })
      if (checkResponse.request_id) {
        const { password, phoneNumber } = await this.authenticationService.getRequestFromCache(checkResponse.request_id)
        // Use derived phone number instead of allowing it to be passed in as a parameter
        if (phoneNumber) {
          // Once we've verified the phone number we can create a user
          const user = await this.authenticationService.createUser({ phoneNumber, password })
          const { access_token } = await this.authenticationService.login(user)
          return { ...checkResponse, access_token }
        }
      }
    } catch (err) {
      console.log('Error verifying code', err)
    }
    return null
  }
}