import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../../interfaces';

export interface IUser {
  id: string;
  fullname: string;
  username: string;
  email: string;
  isVerified: boolean;
  bio: string;
  imageUrl: string;
  imageId: string;
  backgroundImageUrl: string;
  backgroundImageId: string;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface UserDatas {
  data: IUser[];
}

export interface UserData {
  data: IUser;
}

export interface MultipleUserParams {
  ids: string[];
}

export interface NoArguments {}

export interface UserParams {
  id: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface TokenResponse {
  token: string;
}

export interface RegisterInput {
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  confirmPassword: string;
}

export interface Message {
  message: string;
}

export interface ChangeProfileInput {
  url: string;
  fileId: string;
}

export interface TokenInput {
  token: string;
}

export interface EmailInput {
  email: string;
}

export interface RegisterResp {
  data: IUser;
  token: string;
}

export interface IUserService extends ServiceClient {
  GetMultipleUser: GRPC_UNARY<MultipleUserParams, UserDatas>;
  Me: GRPC_UNARY<NoArguments, UserData>;
  GetUserById: GRPC_UNARY<UserParams, UserData>;
  Register: GRPC_UNARY<RegisterInput, RegisterResp>;
  Login: GRPC_UNARY<LoginInput, TokenResponse>;
  ChangeProfileImg: GRPC_UNARY<ChangeProfileInput, Message>;
  ChangeBackgroundImg: GRPC_UNARY<ChangeProfileInput, Message>;
  ChangeVerified: GRPC_UNARY<TokenInput, Message>;
  ResendEmailVerification: GRPC_UNARY<EmailInput, Message>;
}
