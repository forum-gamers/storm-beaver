import { Metadata } from '@grpc/grpc-js';

export abstract class GRPCBASE {
  protected generateMetadata(values?: Record<string, any>) {
    const metadata = new Metadata();
    if (values) for (const key in values) metadata.set(key, values[key]);

    return metadata;
  }
}
