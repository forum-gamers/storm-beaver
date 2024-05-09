import type { Metadata } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';

export default class GrpcError extends Error {
  code: Status;
  details: string;
  metadata: Metadata;
  constructor({ message, code, details, metadata }: GrpcErrorProps) {
    super(message);
    this.code = code;
    this.details = details;
    this.metadata = metadata;
    this.name = Status[this.code];
  }
}

export interface GrpcErrorProps extends Error {
  code: Status;
  details: string;
  metadata: Metadata;
}
