import { Injectable } from "@nestjs/common"
import { default as VonageClass, NumberInsightError } from '@vonage/server-sdk'
import { blacklist, BlacklistConfig } from "./constants/blacklist"
import { CheckResponse } from "./entities/check.entity"
import { RequestResponse } from "./entities/request.entity"
const Vonage = require('@vonage/server-sdk')

const requestConfig = {
  pin_expiry: 3600,
  workflow_id: 6
} as const

@Injectable()
export class VerificationService {
  private readonly provider: VonageClass = new Vonage({
    apiKey: '77ce114b',
    apiSecret: process.env.API_SECRET
  })

  private requestBlacklist(number: string): RequestResponse | null {
    const { requestId: request_id } = blacklist[number]
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
    this.provider.verify.request({ ...req, number: req.number.replace('+', ''), ...requestConfig }, (err, result) => {
      if (err) {
        console.error(err);
        throw new Error('Error sending request for phone verification')
      } else {
        resolve(result)
      }
    })
  })

  private checkBlacklist(c: BlacklistConfig): Omit<CheckResponse, 'access_token'> | null {
    const blacklistConfig = Object.values(blacklist).find(config => c.requestId === config.requestId)
    if (blacklistConfig) {
      if (c.code === blacklistConfig.code) {
        return {
          currency: 'USD',
          event_id: '420',
          price: '0',
          request_id: c.requestId,
          status: '0',
        }
      }
    }
    return null
  }

  check = (req: { request_id: string, code: string }) => new Promise<Omit<CheckResponse, 'access_token'> | null>((resolve) => {
    const blacklistedResult = this.checkBlacklist({ ...req, requestId: req.request_id })
    if (blacklistedResult) return resolve(blacklistedResult)
    this.provider.verify.check(req, (err, result) => {
      if (err) {
        console.error(err)
        throw new Error('Error checking verification code request')
      } else if ((result as unknown as NumberInsightError)?.error_text) {
        console.error(result)
        resolve(null)
      } else {
        resolve(result)
      }
    })
  })
}