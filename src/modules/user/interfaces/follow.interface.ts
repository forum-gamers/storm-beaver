import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../../interfaces';

export interface Follow {
  id: number;
  followingId: string;
  followerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserIdInput {
  id: string;
}

export interface Pagination {
  page: number;
  limit: number;
}

export interface FollowDatas {
  datas: Follow[];
}

export interface IFollowService extends ServiceClient {
  FollowUser: GRPC_UNARY<UserIdInput, Follow>;
  GetMyFollow: GRPC_UNARY<Pagination, FollowDatas>;
  GetMyFollower: GRPC_UNARY<Pagination, FollowDatas>;
}
