declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GRPC_USER_SERVICE: string;
      ENCRYPTION_KEY: string;
    }
  }
}

export {};
