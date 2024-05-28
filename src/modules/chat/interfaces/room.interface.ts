import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../../interfaces';
import type {
  DataWithMetadata,
  FileHeader,
  Message,
  Pagination,
  RepeatedUserRoom,
  Room,
  RoomType,
} from './global.interface';

export interface RoomId {
  roomId: string;
}

export interface CreateRoomInput {
  users: string[];
  description?: string;
  name?: string;
  file?: FileHeader;
}

export interface UserRoomInput {
  userId: string;
  roomId: string;
}

export interface RoomByType {
  Group: Room[];
  Private: Room[];
}

export interface PaginationWithRoomType extends Pagination {
  type?: RoomType | 'All';
}

export interface IRoomService extends ServiceClient {
  CreateRoom: GRPC_UNARY<CreateRoomInput, Room>;
  DeleteUser: GRPC_UNARY<UserRoomInput, Message>;
  LeaveRoom: GRPC_UNARY<RoomId, Message>;
  SetAdmin: GRPC_UNARY<UserRoomInput, RepeatedUserRoom>;
  DownAdmin: GRPC_UNARY<UserRoomInput, RepeatedUserRoom>;
  GetUserRoom: GRPC_UNARY<Pagination, DataWithMetadata<RoomByType>>;
  GetRoomById: GRPC_UNARY<RoomId, Room>;
}
