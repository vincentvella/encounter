import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import auth from './links/auth';
import http from './links/http';

const client = new ApolloClient({
  link: ApolloLink.from([auth, http]),
  cache: new InMemoryCache(),
});

export default client