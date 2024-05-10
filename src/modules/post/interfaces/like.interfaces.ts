import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../../interfaces';

export interface LikeIdPayload {
  postId: string;
}

export interface Like {
  _id: string;
  userId: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  message: string;
}

export interface ILikeService extends ServiceClient {
  CreateLike: GRPC_UNARY<LikeIdPayload, Like>;
  DeleteLike: GRPC_UNARY<LikeIdPayload, Message>;
}
