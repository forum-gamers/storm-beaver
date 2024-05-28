import { Injectable, type OnModuleInit } from '@nestjs/common';
import { config } from 'dotenv';
import { GRPCBASE } from '../../../base/grpc.base.service';
import type {
  Follow,
  FollowDatas,
  IFollowService,
  Pagination,
  UserIdInput,
} from '../interfaces/follow.interface';
import { join } from 'path';
import { credentials } from '@grpc/grpc-js';

config();

@Injectable()
export class FollowService extends GRPCBASE implements OnModuleInit {
  private followService: IFollowService;
  public onModuleInit() {
    this.loadFollowDefinition();
  }

  private loadFollowDefinition() {
    const Service = this.loadService(
      join(__dirname, '../proto/follow.proto'),
      'follow',
      'FollowService',
    );

    this.followService = new Service(
      process.env.GRPC_USER_SERVICE ?? 'localhost:50050',
      credentials.createInsecure(),
    ) as IFollowService;
  }

  public async followUser(args: UserIdInput, access_token: string) {
    return new Promise<Follow>((resolve, reject) => {
      this.followService.FollowUser(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async getMyFollow(args: Pagination, access_token: string) {
    return new Promise<FollowDatas>((resolve, reject) => {
      this.followService.GetMyFollow(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async getMyFollower(args: Pagination, access_token: string) {
    return new Promise<FollowDatas>((resolve, reject) => {
      this.followService.GetMyFollower(
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
