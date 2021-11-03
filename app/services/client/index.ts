import { ApolloClient, InMemoryCache } from '@apollo/client'
import auth from './links/auth';
import http from './links/http';

const link = auth.concat(http)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client