import type { FileInput } from './request';

export interface CreateRoomInput {
  users: string[];
  description?: string;
  name?: string;
  file?: FileInput;
}

export interface CreateChatInput {
  roomId: string;
  message?: string;
  file?: FileInput | null;
}
