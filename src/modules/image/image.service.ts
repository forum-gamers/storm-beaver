import { Injectable, type OnModuleInit } from '@nestjs/common';
import { GRPCBASE } from 'src/base/grpc.base.service';
import type {
  FileHeader,
  IImageService,
  UploadFileResult,
} from './image.interface';
import { join } from 'path';
import {
  loadPackageDefinition,
  credentials,
  type ServiceClientConstructor,
  type GrpcObject,
} from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

@Injectable()
export class ImageService extends GRPCBASE implements OnModuleInit {
  private imageService: IImageService;
  public onModuleInit() {
    this.loadImageDefinition();
  }

  private loadImageDefinition() {
    const Service = (
      loadPackageDefinition(
        loadSync(join(__dirname, './proto/image.proto'), {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        }),
      ).image as GrpcObject
    ).Image as ServiceClientConstructor;

    this.imageService = new Service(
      process.env.GRPC_IMAGE_SERVICE ?? 'localhost:50060',
      credentials.createInsecure(),
    ) as IImageService;
  }

  public async uploadImg(args: FileHeader, access_token: string) {
    return new Promise<UploadFileResult>((resolve, reject) => {
      this.imageService.UploadImg(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) reject(err);

          resolve(resp);
        },
      );
    });
  }
}
