declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GRPC_USER_SERVICE: string;
      ENCRYPTION_KEY: string;
      GRPC_POST_SERVICE: string;
      GRPC_IMAGE_SERVICE: string;
      GRPC_COMMUNITY_SERVICE: string;
      GRPC_TRANSACTION_SERVICE: string;
      NODE_ENV: 'development' | 'test' | 'production';
      MIDTRANS_SERVER_KEY: string;
      MIDTRANS_CLIENT_KEY: string;
    }
  }
}

export {};
