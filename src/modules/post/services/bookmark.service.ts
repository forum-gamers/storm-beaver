import { Injectable, type OnModuleInit } from '@nestjs/common';
import { GRPCBASE } from '../../../base/grpc.base.service';
import { join } from 'path';
import { credentials } from '@grpc/grpc-js';
import type {
  IBookmark,
  IBookmarkService,
  IdPayload,
  Messages,
  PaginationWithPostId,
  PostIdPayload,
  RespWithMetadata,
} from '../interfaces/bookmark.interfaces';

@Injectable()
export class BookmarkService extends GRPCBASE implements OnModuleInit {
  private bookmarkService: IBookmarkService;
  public onModuleInit() {
    this.loadBookmarkDefinition();
  }

  private loadBookmarkDefinition() {
    const Service = this.loadService(
      join(__dirname, '../proto/bookmark.proto'),
      'bookmark',
      'BookmarkService',
    );

    this.bookmarkService = new Service(
      process.env.GRPC_POST_SERVICE ?? 'localhost:50052',
      credentials.createInsecure(),
    ) as IBookmarkService;
  }

  public async createBookmark(args: PostIdPayload, access_token: string) {
    return new Promise<IBookmark>((resolve, reject) => {
      this.bookmarkService.CreateBookmark(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async deleteBookmark(args: IdPayload, access_token: string) {
    return new Promise<Messages>((resolve, reject) => {
      this.bookmarkService.DeleteBookmark(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async findMyBookmark(
    args: PaginationWithPostId,
    access_token: string,
  ) {
    return new Promise<RespWithMetadata>((resolve, reject) => {
      this.bookmarkService.GetMyBookmarks(
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
