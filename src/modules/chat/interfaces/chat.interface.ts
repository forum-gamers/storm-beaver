import type { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import type { GRPC_UNARY } from '../../../interfaces';
import type { Chat, FileHeader, Message } from './global.interface';

export interface CreateChatInput extends RoomIdInput {
  message: string;
  file?: FileHeader;
}

export interface SetReadInput extends RoomIdInput {
  chatIds: string[];
}

export interface UpdateChatMsgInput extends RoomIdInput {
  chatId: string;
  message: string;
}

export interface DeleteChatInput extends RoomIdInput {
  chatId: string;
}

export interface RoomIdInput {
  roomId: string;
}

export interface IChatService extends ServiceClient {
  CreateChat: GRPC_UNARY<CreateChatInput, Chat>;
  SetRead: GRPC_UNARY<SetReadInput, Message>;
  EditMsg: GRPC_UNARY<UpdateChatMsgInput, Message>;
  DeleteMsg: GRPC_UNARY<DeleteChatInput, Message>;
}
