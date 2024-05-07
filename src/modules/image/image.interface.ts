import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../interfaces';
import type { FileUploadInput } from '../../interfaces/request';

export interface FileHeader {
  filename: string;
  contentType: string;
  content: Buffer;
}

export interface UploadFileResult {
  file_id: string;
  name: string;
  url: string;
  content_type: string;
}

export interface DeleteFileInput {
  file_id: string;
}

export interface Message {
  message: string;
}

export interface IImageService extends ServiceClient {
  UploadImg: GRPC_UNARY<FileUploadInput, UploadFileResult>;
  DeleteFile: GRPC_UNARY<DeleteFileInput, Message>;
}
