import { HttpLink } from "@apollo/client";
import Constants from 'expo-constants';

const http = new HttpLink({ uri: `https://${Constants.manifest?.extra?.apiUrl}` })

export default http
