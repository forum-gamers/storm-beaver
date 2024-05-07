import { Injectable, type OnModuleInit } from '@nestjs/common';
import {
  loadPackageDefinition,
  credentials,
  type ServiceClientConstructor,
  type GrpcObject,
} from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { join } from 'path';
import type {
  GetPostParams,
  IPostService,
  Message,
  Pagination,
  PaginationWithUserId,
  Post,
  PostForm,
  PostIdPayload,
  PostRespWithMetadata,
  TopTagResp,
} from '../post.interfaces';
import { GRPCBASE } from '../../../base/grpc.base.service';

@Injectable()
export class PostService extends GRPCBASE implements OnModuleInit {
  private postService: IPostService;
  public onModuleInit() {
    this.loadPostDefinition();
  }

  private loadPostDefinition() {
    const Service = (
      loadPackageDefinition(
        loadSync(join(__dirname, '../proto/post.proto'), {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        }),
      ).post as GrpcObject
    ).PostService as ServiceClientConstructor;

    this.postService = new Service(
      process.env.GRPC_POST_SERVICE ?? 'localhost:50052',
      credentials.createInsecure(),
    ) as IPostService;
  }

  public async createPost(args: PostForm, token: string) {
    return new Promise<Post>((resolve, reject) => {
      this.postService.CreatePost(
        args,
        this.generateMetadata({ access_token: token }),
        (err, resp) => {
          if (err) reject(err);

          resolve(resp);
        },
      );
    });
  }

  public async deletePost(args: PostIdPayload, token: string) {
    return new Promise<Message>((resolve, reject) => {
      this.postService.DeletePost(
        args,
        this.generateMetadata({ access_token: token }),
        (err, resp) => {
          if (err) reject(err);

          resolve(resp);
        },
      );
    });
  }

  public async getPublicContent(args: GetPostParams, token: string) {
    return new Promise<PostRespWithMetadata>((resolve) => {
      this.postService.GetPublicContent(
        args,
        this.generateMetadata({ access_token: token }),
        (err, resp) => {
          console.log(err);
          resolve(
            err
              ? {
                  totalData: 0,
                  totalPage: 0,
                  page: 1,
                  limit: 10,
                  data: [],
                }
              : resp,
          );
        },
      );
    });
  }

  public async getUserPost(args: Pagination, token: string) {
    return new Promise<PostRespWithMetadata>((resolve) => {
      this.postService.GetUserPost(
        args,
        this.generateMetadata({ access_token: token }),
        (err, resp) => {
          resolve(
            err
              ? {
                  totalData: 0,
                  totalPage: 0,
                  page: 1,
                  limit: 10,
                  data: [],
                }
              : resp,
          );
        },
      );
    });
  }

  public async getLikedPost(args: Pagination, token: string) {
    return new Promise<PostRespWithMetadata>((resolve) => {
      this.postService.GetLikedPost(
        args,
        this.generateMetadata({ access_token: token }),
        (err, resp) => {
          resolve(
            err
              ? {
                  totalData: 0,
                  totalPage: 0,
                  page: 1,
                  limit: 10,
                  data: [],
                }
              : resp,
          );
        },
      );
    });
  }

  public async getUserMedia(args: Pagination, token: string) {
    return new Promise<PostRespWithMetadata>((resolve) => {
      this.postService.GetUserMedia(
        args,
        this.generateMetadata({ access_token: token }),
        (err, resp) => {
          resolve(
            err
              ? {
                  totalData: 0,
                  totalPage: 0,
                  page: 1,
                  limit: 10,
                  data: [],
                }
              : resp,
          );
        },
      );
    });
  }

  public async getUserPostById(args: PaginationWithUserId, token: string) {
    return new Promise<PostRespWithMetadata>((resolve) => {
      this.postService.GetUserPostById(
        args,
        this.generateMetadata({ access_token: token }),
        (err, resp) => {
          resolve(
            err
              ? {
                  totalData: 0,
                  totalPage: 0,
                  page: 1,
                  limit: 10,
                  data: [],
                }
              : resp,
          );
        },
      );
    });
  }

  public async getMediaByUserId(args: PaginationWithUserId, token: string) {
    return new Promise<PostRespWithMetadata>((resolve) => {
      this.postService.GetMediaByUserId(
        args,
        this.generateMetadata({ access_token: token }),
        (err, resp) => {
          resolve(
            err
              ? {
                  totalData: 0,
                  totalPage: 0,
                  page: 1,
                  limit: 10,
                  data: [],
                }
              : resp,
          );
        },
      );
    });
  }

  public async getUserLikedPost(args: PaginationWithUserId, token: string) {
    return new Promise<PostRespWithMetadata>((resolve) => {
      this.postService.GetUserLikedPost(
        args,
        this.generateMetadata({ access_token: token }),
        (err, resp) => {
          resolve(
            err
              ? {
                  totalData: 0,
                  totalPage: 0,
                  page: 1,
                  limit: 10,
                  data: [],
                }
              : resp,
          );
        },
      );
    });
  }

  public async getTopTags(args: Pagination, token: string) {
    return new Promise<TopTagResp>((resolve) => {
      this.postService.GetTopTags(
        args,
        this.generateMetadata({ access_token: token }),
        (err, resp) => {
          resolve({ datas: err ? [] : resp.datas });
        },
      );
    });
  }
}