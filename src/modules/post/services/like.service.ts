import { Injectable, type OnModuleInit } from '@nestjs/common';
import { credentials } from '@grpc/grpc-js';
import { join } from 'path';
import { GRPCBASE } from '../../../base/grpc.base.service';
import type {
  ILikeService,
  Like,
  LikeIdPayload,
  Message,
} from '../interfaces/like.interfaces';
import { config } from 'dotenv';

config();

@Injectable()
export class LikeService extends GRPCBASE implements OnModuleInit {
  private likeService: ILikeService;
  public onModuleInit() {
    this.loadLikeDefinition();
  }

  private loadLikeDefinition() {
    const Service = this.loadService(
      join(__dirname, '../proto/like.proto'),
      'like',
      'LikeService',
    );

    this.likeService = new Service(
      process.env.GRPC_POST_SERVICE ?? 'localhost:50052',
      credentials.createInsecure(),
    ) as ILikeService;
  }

  public async createLike(args: LikeIdPayload, access_token: string) {
    return new Promise<Like>((resolve, reject) => {
      this.likeService.CreateLike(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async deleteLike(args: LikeIdPayload, access_token: string) {
    return new Promise<Message>((resolve, reject) => {
      this.likeService.DeleteLike(
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
