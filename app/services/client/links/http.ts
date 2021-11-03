import { HttpLink } from "@apollo/client";

const http = new HttpLink({ uri: 'https://encounter-dev.loca.lt/graphql' })

export default http
