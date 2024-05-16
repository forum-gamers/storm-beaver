import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { FileHeader, GRPC_UNARY } from '../../../interfaces';
import type { FileInput } from '../../../interfaces/request';

export interface Message {
  message: string;
}

export interface PostForm {
  files: FileHeader[];
  text: string;
  allowComment: boolean;
  privacy: string;
}

export interface PostIdPayload {
  _id: string;
}

export interface Media {
  id: string;
  type: string;
  url: string;
}

export interface Post {
  _id: string;
  userId: string;
  text: string;
  media: Media[];
  allowComment: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  privacy: string;
}

export interface Pagination {
  page: number;
  limit: number;
}

export interface PaginationWithUserId extends Pagination {
  userId: string;
}

export interface PostRespWithMetadata {
  totalData: number;
  limit: number;
  page: number;
  totalPage: number;
  data: PostResponse[];
}

export interface PostResponse {
  _id: string;
  userId: string;
  text: string;
  media: Media[];
  allowComment: boolean;
  createdAt: string;
  updatedAt: string;
  countLike: number;
  countShare: number;
  isLiked: boolean;
  isShared: boolean;
  tags: string[];
  privacy: string;
  totalData: number;
}

export interface GetPostParams extends Pagination {
  tags: string[];
  userIds: string[];
}

export interface TopTag {
  _id: string;
  count: number;
  posts: string[];
}

export interface TopTagResp {
  datas: TopTag[];
}

export interface CreatePostInput {
  files: FileInput[];
  text: string;
  allowComment: boolean;
  privacy: string;
}

export interface ListIdsResp {
  datas: string[];
}

export interface IPostService extends ServiceClient {
  CreatePost: GRPC_UNARY<PostForm, Post>;
  DeletePost: GRPC_UNARY<PostIdPayload, ListIdsResp>;
  GetPublicContent: GRPC_UNARY<GetPostParams, PostRespWithMetadata>;
  GetUserPost: GRPC_UNARY<Pagination, PostRespWithMetadata>;
  GetLikedPost: GRPC_UNARY<Pagination, PostRespWithMetadata>;
  GetUserMedia: GRPC_UNARY<Pagination, PostRespWithMetadata>;
  GetUserPostById: GRPC_UNARY<PaginationWithUserId, PostRespWithMetadata>;
  GetMediaByUserId: GRPC_UNARY<PaginationWithUserId, PostRespWithMetadata>;
  GetUserLikedPost: GRPC_UNARY<PaginationWithUserId, PostRespWithMetadata>;
  GetTopTags: GRPC_UNARY<Pagination, TopTagResp>;
  FindById: GRPC_UNARY<PostIdPayload, PostResponse>;
}
