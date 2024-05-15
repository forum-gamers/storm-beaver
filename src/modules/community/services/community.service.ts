import { Injectable, type OnModuleInit } from '@nestjs/common';
import type {
  ChangeOwnershipInput,
  Community,
  CommunityIdInput,
  CreateCommunityInput,
  ICommunityService,
  ImageIdResp,
  TextInput,
  UpdateImgInput,
} from '../interfaces/community.interface';
import { GRPCBASE } from '../../../base/grpc.base.service';
import { join } from 'path';
import { credentials } from '@grpc/grpc-js';
import { config } from 'dotenv';

config();

@Injectable()
export class CommunityService extends GRPCBASE implements OnModuleInit {
  private communityService: ICommunityService;
  public onModuleInit() {
    this.loadCommunityDefinition();
  }

  private loadCommunityDefinition() {
    const Service = this.loadService(
      join(__dirname, '../proto/community.proto'),
      'community',
      'CommunityService',
    );

    this.communityService = new Service(
      process.env.GRPC_COMMUNITY_SERVICE ?? 'localhost:50054',
      credentials.createInsecure(),
    ) as ICommunityService;
  }

  public async createCommunity(
    args: CreateCommunityInput,
    access_token: string,
  ) {
    return new Promise<Community>((resolve, reject) => {
      this.communityService.CreateCommunity(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async deleteCommunity(args: CommunityIdInput, access_token: string) {
    return new Promise<ImageIdResp>((resolve, reject) => {
      this.communityService.DeleteCommunity(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async updateImg(args: UpdateImgInput, access_token: string) {
    return new Promise<Community>((resolve, reject) => {
      this.communityService.UpdateImage(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async updateBg(args: UpdateImgInput, access_token: string) {
    return new Promise<Community>((resolve, reject) => {
      this.communityService.UpdateBackground(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async updateDesc(args: TextInput, access_token: string) {
    return new Promise<Community>((resolve, reject) => {
      this.communityService.UpdateDesc(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async changeOwnership(
    args: ChangeOwnershipInput,
    access_token: string,
  ) {
    return new Promise<Community>((resolve, reject) => {
      this.communityService.ChangeOwnership(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async findById(args: CommunityIdInput, access_token: string) {
    return new Promise<Community>((resolve, reject) => {
      this.communityService.FindById(
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
