import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://encounter-dev.loca.lt/graphql',
  cache: new InMemoryCache()
});

export default client