import { Injectable, type OnModuleInit } from '@nestjs/common';
import { credentials } from '@grpc/grpc-js';
import type {
  GetPostParams,
  IPostService,
  ListIdsResp,
  Pagination,
  PaginationWithUserId,
  Post,
  PostForm,
  PostIdPayload,
  PostRespWithMetadata,
  TopTagResp,
} from '../interfaces/post.interfaces';
import { GRPCBASE } from '../../../base/grpc.base.service';
import { join } from 'path';

@Injectable()
export class PostService extends GRPCBASE implements OnModuleInit {
  private postService: IPostService;
  public onModuleInit() {
    this.loadPostDefinition();
  }

  private loadPostDefinition() {
    const Service = this.loadService(
      join(__dirname, '../proto/post.proto'),
      'post',
      'PostService',
    );

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
          if (err) reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async deletePost(args: PostIdPayload, token: string) {
    return new Promise<ListIdsResp>((resolve, reject) => {
      this.postService.DeletePost(
        args,
        this.generateMetadata({ access_token: token }),
        (err, resp) => {
          if (err) reject(this.convertError(err));

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
