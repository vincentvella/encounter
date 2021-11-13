import Cookie from "../../storage/cookie"
import { setContext } from "@apollo/client/link/context";

type DevHeaders = {
  'Bypass-Tunnel-Reminder'?: string
}

const auth = setContext(async (_, { headers }) => {
  const token = Cookie.get('jwt')
  const devHeaders: DevHeaders = {}
  if (__DEV__) {
    devHeaders['Bypass-Tunnel-Reminder'] = 'true'
  }
  return {
    headers: {
      ...headers,
      ...devHeaders,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

export default auth