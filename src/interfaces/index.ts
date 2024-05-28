import type { BaseContext } from '@apollo/server';
import type { Metadata } from '@grpc/grpc-js';
import GrpcError from '../base/grpcError.base';
import type { EnablePayment } from 'midtrans-client';

export interface GlobalContext extends BaseContext {
  access_token: string | undefined;
  verify: boolean;
}

export interface ServiceDefinition {
  package: string;
  service: string;
  url: string;
}

export type CallBack<T = any> = (err: GrpcError | null, response: T) => void;

export type GRPC_UNARY<T, R> = (
  args: T,
  metadata: Metadata,
  cb: CallBack<R>,
) => void;

export interface ResolverInitiate {
  GenerateResolver(): ResolverObj;
}

export interface ResolverObj extends Record<string, any> {
  Query: Record<string, any>;
  Mutation?: Record<string, any>;
  Subscription?: Record<string, any>;
}

export interface FileHeader {
  contentType: string;
  url: string;
  fileId: string;
}

export type PaymentType = 'bank' | 'ewallet';

export type PaymentProvider = BankProvider | WalletProvider;

export type BankProvider = 'BCA' | 'MANDIRI' | 'BNI' | 'BRI' | 'PERMATA';

export type WalletProvider = EnablePayment;

export type TransactionType = 'Top up' | 'Payment';

export type Currency = 'IDR' | 'USD';
