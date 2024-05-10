import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../../interfaces';

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

export interface DeleteReplyPayload {
  commentId: string;
  replyId: string;
}

export interface Messages {
  message: string;
}

export interface IReplyService extends ServiceClient {
  CreateReply: GRPC_UNARY<CommentForm, IReply>;
  DeleteReply: GRPC_UNARY<DeleteReplyPayload, Messages>;
}
