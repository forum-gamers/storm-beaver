import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../../interfaces';
import type { Wallet } from './wallet.interface';
import type { TransactionStatus } from 'midtrans-client';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: string;
  status: string;
  transactionDate: string;
  description: string;
  detail: string;
  createdAt: string;
  updatedAt: string;
  discount: number;
  signature?: string;
  itemId?: string;
  fee: number;
}

export interface CreateTransactionInput {
  amount: number;
  type: string;
  currency: string;
  transactionDate?: string;
  description?: string;
  detail?: string;
  discount?: number;
  signature?: string;
  itemId?: string;
}

export interface TransactionIdInput {
  id: string;
}

export interface SignatureInput {
  signature: string;
}

export interface ChangeStatusInput extends SignatureInput {
  status: TransactionStatus | string;
}

export interface ITransactionService extends ServiceClient {
  CreateTransaction: GRPC_UNARY<CreateTransactionInput, Transaction>;
  CancelTransaction: GRPC_UNARY<TransactionIdInput, Transaction>;
  FindOneBySignature: GRPC_UNARY<SignatureInput, Transaction>;
  SuccessTopup: GRPC_UNARY<SignatureInput, Wallet>;
  ChangeStatusTopupTransaction: GRPC_UNARY<ChangeStatusInput, Transaction>;
}
