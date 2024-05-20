import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../../interfaces';

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

export interface ITransactionService extends ServiceClient {
  CreateTransaction: GRPC_UNARY<CreateTransactionInput, Transaction>;
  CancelTransaction: GRPC_UNARY<TransactionIdInput, Transaction>;
}
