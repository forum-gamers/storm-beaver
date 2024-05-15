import { Injectable, type OnModuleInit } from '@nestjs/common';
import { GRPCBASE } from '../../../base/grpc.base.service';
import type {
  DeleteFileInput,
  IImageService,
  Message,
  MultipleFileHeader,
  MultipleFileIdInput,
  MultipleUploadFileResult,
  UploadFileResult,
} from '../interfaces/image.interface';
import { join } from 'path';
import { credentials } from '@grpc/grpc-js';
import type { FileUploadInput } from '../../../interfaces/request';

@Injectable()
export class ImageService extends GRPCBASE implements OnModuleInit {
  private imageService: IImageService;
  public onModuleInit() {
    this.loadImageDefinition();
  }

  private loadImageDefinition() {
    const Service = this.loadService(
      join(__dirname, '../proto/image.proto'),
      'image',
      'Image',
    );

    this.imageService = new Service(
      process.env.GRPC_IMAGE_SERVICE ?? 'localhost:50060',
      credentials.createInsecure(),
    ) as IImageService;
  }

  public async uploadImg(args: FileUploadInput, access_token: string) {
    return new Promise<UploadFileResult>((resolve, reject) => {
      this.imageService.UploadImg(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(err);

          resolve(resp);
        },
      );
    });
  }

  public async deleteFile(args: DeleteFileInput, access_token: string) {
    return new Promise<string>((resolve, reject) => {
      this.imageService.DeleteFile(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));
          resolve(resp?.message ?? '');
        },
      );
    });
  }

  public async bulkUpload(args: MultipleFileHeader, access_token: string) {
    return new Promise<MultipleUploadFileResult>((resolve, reject) => {
      this.imageService.BulkUpload(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async bulkDelete(args: MultipleFileIdInput, access_token: string) {
    return new Promise<Message>((resolve, reject) => {
      this.imageService.BulkDeleteFile(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }
}
