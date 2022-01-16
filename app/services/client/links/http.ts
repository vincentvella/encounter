import { HttpLink } from "@apollo/client";
import Constants from 'expo-constants';

const http = new HttpLink({ uri: `https://${process.env.API_URL}` })

export default http
