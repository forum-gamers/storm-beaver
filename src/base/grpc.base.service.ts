import { Metadata } from '@grpc/grpc-js';
import GrpcError from './grpcError.base';
import AppError from './error.base';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { loadSync } from '@grpc/proto-loader';
import {
  loadPackageDefinition,
  type ServiceClientConstructor,
  type GrpcObject,
} from '@grpc/grpc-js';

export abstract class GRPCBASE {
  protected generateMetadata(values?: Record<string, any>) {
    const metadata = new Metadata();
    if (values) for (const key in values) metadata.set(key, values[key]);

    return metadata;
  }

  protected convertError(err: GrpcError) {
    return new AppError({
      status: err?.code ?? Status.UNKNOWN,
      message: err?.details ?? 'unexpected error',
    });
  }

  protected loadService(
    relativeUrl: string,
    objKey: string,
    serviceKey: string,
  ) {
    return (
      loadPackageDefinition(
        loadSync(relativeUrl, {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        }),
      )[objKey] as GrpcObject
    )[serviceKey] as ServiceClientConstructor;
  }
}
