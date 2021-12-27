import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import http from "./http";
import ws from "./ws";

export default split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  ws,
  http,
)