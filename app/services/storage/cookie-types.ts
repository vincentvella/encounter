import { CookieAttributes } from "js-cookie";

type PickedCookieOptions = Pick<CookieAttributes, 'domain' | 'path' | 'sameSite' | 'secure'>

export interface CookieOptions extends PickedCookieOptions {
  expires: string
}