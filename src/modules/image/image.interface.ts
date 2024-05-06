import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import { GRPC_UNARY } from 'src/interfaces';

export interface FileHeader {
  filename: string;
  contentType: string;
  size: number;
  header: string[];
  content: Buffer;
}

export interface UploadFileResult {
  file_id: string;
  name: string;
  url: string;
  content_type: string;
}

export interface IImageService extends ServiceClient {
  UploadImg: GRPC_UNARY<FileHeader, UploadFileResult>;
}
