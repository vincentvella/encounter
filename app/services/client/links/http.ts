import { HttpLink } from "@apollo/client";

const http = new HttpLink({ uri: 'https://encounter-dev-1.loca.lt/graphql' })

export default http
