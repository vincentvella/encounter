import { Args, Query, Resolver } from "@nestjs/graphql";
import { CheckResponse } from "src/verification/entities/check.entity";
import { RequestResponse } from "src/verification/entities/request.entity";
import { VerificationService } from "src/verification/verification.service";

@Resolver(of => RequestResponse)
export class AuthenticationResolver {
  constructor(private readonly verificationService: VerificationService) { }

  @Query((returns) => RequestResponse, { nullable: true })
  async requestCode(@Args('number', { nullable: false }) number: string) {
    try {
      return this.verificationService.request({ number, brand: 'Encounter' })
    } catch (err) {
      return null
    }
  }

  @Query((returns) => CheckResponse, { nullable: true })
  verifyCode(
    @Args('request_id', { nullable: false }) request_id: string,
    @Args('code', { nullable: false }) code: string
  ) {
    try {
      return this.verificationService.check({ request_id, code })
    } catch (err) {
      return null
    }
  }
}