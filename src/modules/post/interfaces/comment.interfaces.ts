import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../../interfaces';

export interface IComment {
  _id: string;
  text: string;
  userId: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
  reply: IReply[];
}

export interface IReply {
  _id: string;
  userId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentForm {
  text: string;
  postId: string;
}

export interface CommentIdPayload {
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

export interface CommentResp extends IComment {
  totalData: number;
}

export interface CommentRespWithMetadata {
  totalData: number;
  limit: number;
  page: number;
  totalPage: number;
  data: CommentResp[];
}

export interface ICommentService extends ServiceClient {
  CreateComment: GRPC_UNARY<CommentForm, IComment>;
  DeleteComment: GRPC_UNARY<CommentIdPayload, Messages>;
  FindPostComment: GRPC_UNARY<PaginationWithPostId, CommentRespWithMetadata>;
}
