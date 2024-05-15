import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../../interfaces';

export interface CommunityIdInput {
  communityId: string;
}

export interface Message {
  message: string;
}

export interface IMemberService extends ServiceClient {
  JoinCommunity: GRPC_UNARY<CommunityIdInput, Message>;
  LeaveCommunity: GRPC_UNARY<CommunityIdInput, Message>;
}
