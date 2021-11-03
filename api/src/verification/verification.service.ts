import { Injectable } from "@nestjs/common"
import { default as VonageClass, NumberInsightError } from '@vonage/server-sdk'
import { CheckResponse } from "./entities/check.entity"
import { RequestResponse } from "./entities/request.entity"
const Vonage = require('@vonage/server-sdk')

@Injectable()
export class VerificationService {
  private readonly provider: VonageClass = new Vonage({
    apiKey: '77ce114b',
    apiSecret: process.env.API_SECRET
  })

  request = async (req: { number: string, brand: string }) => new Promise<RequestResponse | null>((resolve) => {
    console.log('... huh')
    this.provider.verify.request({ ...req, pin_expiry: 3600, workflow_id: 6 }, (err, result) => {
      if (err) {
        console.error(err);
        throw new Error('Error sending request for phone verification')
      } else {
        console.log({ result })
        resolve(result)
      }
    })
  })

  check = (req: { request_id: string, code: string }) => new Promise<Omit<CheckResponse, 'access_token'> | null>((resolve) => {
    this.provider.verify.check(req, (err, result) => {
      if (err) {
        console.error(err)
        throw new Error('Error checking verification code request')
      } else if ((result as unknown as NumberInsightError)?.error_text) {
        console.error(result)
        resolve(null)
      } else {
        console.log({ result })
        resolve(result)
      }
    })
  })
}