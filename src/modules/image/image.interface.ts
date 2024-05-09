import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../interfaces';
import type { FileUploadInput } from '../../interfaces/request';

export interface FileHeader extends FileHeaderWithoutFolder {
  folder: string;
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

export interface FileHeaderWithoutFolder {
  filename: string;
  content: string;
}

export interface MultipleFileHeader {
  files: FileHeaderWithoutFolder[];
  folder: string;
}

export interface MultipleUploadFileResult {
  datas: UploadFileResult[];
}

export interface IImageService extends ServiceClient {
  UploadImg: GRPC_UNARY<FileUploadInput, UploadFileResult>;
  DeleteFile: GRPC_UNARY<DeleteFileInput, Message>;
  BulkUpload: GRPC_UNARY<MultipleFileHeader, MultipleUploadFileResult>;
}
