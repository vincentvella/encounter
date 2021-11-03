import * as JSCookies from 'js-cookie'
import { CookieOptions } from './cookie-types'

const get = JSCookies.get
const remove = JSCookies.remove
const set = (name: string, value: string, options: CookieOptions) => JSCookies.set(name, value, {
  ...options,
  expires: options?.expires ? new Date(options.expires) : undefined,
})

const Cookie = {
  get,
  set,
  remove
}

export default Cookie