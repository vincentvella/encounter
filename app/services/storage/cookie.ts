import { CookieOptions } from './cookie-types'
import Storage from './storage'

const exp = '::expires'

const get = (name: string) => {
  const expires = Storage.getItem(`${name}${exp}`)
  if (expires) {
    if (new Date() > new Date(expires)) {
      // It expired, no returned value
      Storage.removeItem(`${name}${exp}`)
      return null
    }
  }
  return Storage.getItem(name) || null
}

const set = (name: string, value: string, options?: CookieOptions) => {
  if (options?.expires) {
    Storage.setItem(`${name}${exp}`, options.expires)
  }
  Storage.setItem(name, value)
}

const remove = (name: string) => {
  Storage.removeItem(`${name}${exp}`)
  Storage.removeItem(name)
}

const Cookie = {
  get,
  set,
  remove
}

export default Cookie
