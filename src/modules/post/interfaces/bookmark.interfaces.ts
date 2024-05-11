import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../../interfaces';
import { PostResponse } from './post.interfaces';

export interface IBookmark {
  _id: string;
  postId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostIdPayload {
  postId: string;
}

export interface IdPayload {
  _id: string;
}

export interface Messages {
  message: string;
}

export interface PaginationWithPostId {
  page: number;
  limit: number;
  postId: string;
}

export interface RespWithMetadata {
  totalData: number;
  limit: number;
  page: number;
  totalPage: number;
  data: PostResponse[];
}

export interface IBookmarkService extends ServiceClient {
  CreateBookmark: GRPC_UNARY<PostIdPayload, IBookmark>;
  DeleteBookmark: GRPC_UNARY<IdPayload, Messages>;
  GetMyBookmarks: GRPC_UNARY<PaginationWithPostId, RespWithMetadata>;
}
