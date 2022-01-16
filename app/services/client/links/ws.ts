import {
  ApolloLink,
  Operation,
  FetchResult,
  Observable,
} from '@apollo/client/core';
import { print, GraphQLError } from 'graphql';
import { createClient, ClientOptions, Client } from 'graphql-ws';
import Constants from 'expo-constants';
import Cookie from '../../storage/cookie';

class WebSocketLink extends ApolloLink {
  private client: Client;
  private restartRequested = false;
  private restart = () => {
    this.restartRequested = true;
  };

  constructor(options: ClientOptions) {
    super();
    this.client = createClient({
      ...options,
      on: {
        ...options.on,
        opened: (socket: any) => {
          options.on?.opened?.(socket);

          this.restart = () => {
            if (socket.readyState === WebSocket.OPEN) {
              // if the socket is still open for the restart, do the restart
              socket.close(4205, 'Client Restart');
            } else {
              // otherwise the socket might've closed, indicate that you want
              // a restart on the next opened event
              this.restartRequested = true;
            }
          };

          // just in case you were eager to restart
          if (this.restartRequested) {
            this.restartRequested = false;
            this.restart();
          }
        },
      },
    });
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

console.log('extra', process.env)

const getUrl = () => {
  if (!(process.env.API_URL || '').includes('onrender')) {
    return `wss://${process.env.API_URL}`
  }
  return `ws://${process.env.API_URL}`
}

const ws = new WebSocketLink({
  url: getUrl(),
  connectionParams: () => {
    const token = Cookie.get('jwt')
    return {
      authorization: token ? `Bearer ${token}` : null,
    };
  },
});

export default ws