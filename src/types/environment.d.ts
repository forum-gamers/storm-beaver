declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GRPC_USER_SERVICE: string;
      ENCRYPTION_KEY: string;
      GRPC_POST_SERVICE: string;
      GRPC_IMAGE_SERVICE: string;
    }
  }
}

export {};
