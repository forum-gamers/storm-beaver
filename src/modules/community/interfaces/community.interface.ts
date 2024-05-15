import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../../interfaces';

export interface CreateCommunityInput {
  name: string;
  imageUrl?: string;
  imageId?: string;
  desc?: string;
  backgroundUrl?: string;
  backgroundId?: string;
}

export interface Community {
  id: string;
  name: string;
  imageUrl: string;
  imageId: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  backgroundUrl: string;
  backgroundId: string;
}

export interface ImageIdResp {
  imageId?: string;
  backgroundId?: string;
}

export interface CommunityIdInput {
  communityId: string;
}

export interface UpdateImgInput {
  url: string;
  id: string;
  communityId: string;
}

export interface TextInput {
  text: string;
  communityId: string;
}

export interface ChangeOwnershipInput {
  communityId: string;
  targetId: string;
}

export interface ICommunityService extends ServiceClient {
  CreateCommunity: GRPC_UNARY<CreateCommunityInput, Community>;
  DeleteCommunity: GRPC_UNARY<CommunityIdInput, ImageIdResp>;
  UpdateImage: GRPC_UNARY<UpdateImgInput, Community>;
  UpdateBackground: GRPC_UNARY<UpdateImgInput, Community>;
  UpdateDesc: GRPC_UNARY<TextInput, Community>;
  ChangeOwnership: GRPC_UNARY<ChangeOwnershipInput, Community>;
  FindById: GRPC_UNARY<CommunityIdInput, Community>;
}
