import Cookie from "../../storage/cookie"
import { setContext } from "@apollo/client/link/context";


const auth = setContext(async (_, { headers }) => {
  const token = Cookie.get('jwt')
  return {
    ...headers,
    authorization: token ? `Bearer ${token}` : null,
  }
})

export default auth