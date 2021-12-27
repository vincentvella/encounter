import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'

import auth from './links/auth';
import networkingSplit from './links/networkingSplit';

const client = new ApolloClient({
  link: ApolloLink.from([auth, networkingSplit]),
  cache: new InMemoryCache(),
});

export default client