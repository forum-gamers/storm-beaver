import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../../interfaces';

export interface Vendor {
  id: number;
  userId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  imageId?: string;
  backgroundImageUrl?: string;
  backgroundImageId?: string;
}

export interface FileInput {
  url: string;
  fileId: string;
}

export interface CreateVendorInput {
  name: string;
  description?: string;
  image?: FileInput;
  background?: FileInput;
}

export interface DescInput {
  desc: string;
}

export interface NoArguments {}

export interface IVendorService extends ServiceClient {
  CreateVendorAccount: GRPC_UNARY<CreateVendorInput, Vendor>;
  UpdateVendorImg: GRPC_UNARY<FileInput, Vendor>;
  UpdateVendorBg: GRPC_UNARY<FileInput, Vendor>;
  UpdateDesc: GRPC_UNARY<DescInput, Vendor>;
  Me: GRPC_UNARY<NoArguments, Vendor>;
}
