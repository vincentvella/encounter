declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    ACCOUNT_SID: string;
    API_KEY_SID: string;
    API_KEY_SECRET: string;
  }
}