import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../../interfaces';

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  coin: number;
  createdAt: string;
  updatedAt: string;
}

export interface NoArgument {}

export interface IWalletService extends ServiceClient {
  CreateWallet: GRPC_UNARY<NoArgument, Wallet>;
  FindMyWallet: GRPC_UNARY<NoArgument, Wallet>;
}
