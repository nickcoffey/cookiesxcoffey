declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EMAIL: string
      REFRESH_TOKEN: string
      CLIENT_SECRET: string
      CLIENT_ID: string
      REDIRECT_URI: string
    }
  }
}
export {}
