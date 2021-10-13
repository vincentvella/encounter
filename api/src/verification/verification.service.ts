import { Injectable } from "@nestjs/common"
const Vonage = require('@vonage/server-sdk')

@Injectable()
export class VerificationService {
  private readonly provider = new Vonage({
    apiKey: '77ce114b',
    apiSecret: process.env.API_SECRET
  })

  async request(req: { number: string, brand: string }) {
    return new Promise<any>((resolve, reject) => {
      this.provider.verify.request(req, (err, result) => {
        if (err) {
          console.error(err);
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  async check(req: { request_id: string, code: string }) {
    return new Promise<any>((resolve, reject) => {
      this.provider.verify.check(req, (err, result) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}