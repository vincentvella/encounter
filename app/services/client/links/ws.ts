import {
  ApolloLink,
  Operation,
  FetchResult,
  Observable,
} from '@apollo/client/core';
import { print, GraphQLError } from 'graphql';
import { createClient, ClientOptions, Client } from 'graphql-ws';
import Cookie from '../../storage/cookie';

class WebSocketLink extends ApolloLink {
  private client: Client;

  constructor(options: ClientOptions) {
    super();
    this.client = createClient(options);
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: (err) => {
            if (err instanceof Error) {
              return sink.error(err);
            }

            if (err instanceof CloseEvent) {
              return sink.error(
                // reason will be available on clean closes
                new Error(
                  `Socket closed with event ${err.code} ${err.reason || ''}`,
                ),
              );
            }

            return sink.error(
              new Error(
                ((err as GraphQLError[])?.map
                  ? (err as GraphQLError[]).map(({ message }) => message).join(', ')
                  : (err as GraphQLError)?.message || 'Unknown Error occurred in observable request'),
              ),
            );
          },
        },
      );
    });
  }
}

const ws = new WebSocketLink({
  url: 'ws://encounter-dev.loca.lt/graphql',
  connectionParams: () => {
    const token = Cookie.get('jwt')
    return {
      authorization: token ? `Bearer ${token}` : null,
    };
  },
});

export default ws