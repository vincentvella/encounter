import { Injectable } from "@nestjs/common"
import { default as VonageClass, NumberInsightError } from '@vonage/server-sdk'
import { blacklist } from "./constants/blacklist"
import { CheckResponse } from "./entities/check.entity"
import { RequestResponse } from "./entities/request.entity"
const Vonage = require('@vonage/server-sdk')

@Injectable()
export class VerificationService {
  private readonly provider: VonageClass = new Vonage({
    apiKey: '77ce114b',
    apiSecret: process.env.API_SECRET
  })

  private requestBlacklist(number: string): RequestResponse | null {
    const request_id = blacklist[number]
    if (request_id) {
      return {
        request_id,
        status: '0',
      }
    }
    return null
  }

  request = async (req: { number: string, brand: string }) => new Promise<RequestResponse | null>((resolve) => {
    const blacklistedResult = this.requestBlacklist(req.number)
    if (blacklistedResult) return resolve(blacklistedResult)
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

  private checkBlacklist(request_id: string): Omit<CheckResponse, 'access_token'> | null {
    if (Object.values(blacklist).find(id => request_id === id)) {
      return {
        currency: 'USD',
        event_id: '420',
        price: '0',
        request_id,
        status: '0',
      }
    }
    return null
  }

  check = (req: { request_id: string, code: string }) => new Promise<Omit<CheckResponse, 'access_token'> | null>((resolve) => {
    const blacklistedResult = this.checkBlacklist(req.request_id)
    if (blacklistedResult) return resolve(blacklistedResult)
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