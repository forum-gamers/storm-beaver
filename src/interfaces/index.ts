import type { BaseContext } from '@apollo/server';
import type { Metadata } from '@grpc/grpc-js';

export interface GlobalContext extends BaseContext {
  access_token: string | undefined;
  verify: boolean;
}

export interface ServiceDefinition {
  package: string;
  service: string;
  url: string;
}

export type CallBack<T = any> = (err: Error | null, response: T) => void;

export type GRPC_UNARY<T, R> = (
  args: T,
  metadata: Metadata,
  cb: CallBack<R>,
) => void;

export interface ResolverInitiate {
  GenerateResolver(): any;
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
