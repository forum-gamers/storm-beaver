export interface Room {
  type: RoomType;
  users: UserRoom[];
  image?: string;
  imageId?: string;
  name: string;
  owner: string;
  _id: string;
  chat: Chat[];
}

export type RoomType = 'Private' | 'Group';

export interface UserRoom {
  userId: string;
  addedAt: string;
  role: string;
}

export interface Chat {
  _id: string;
  senderId: string;
  message: string;
  image?: string;
  imageId?: string;
  mediaType: string;
  isRead: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  message: string;
}

export interface RepeatedUserRoom {
  users: UserRoom[];
}

export interface FileHeader {
  contentType: string;
  url: string;
  fileId: string;
}

export interface NoArgument {}

export interface DataWithMetadata<T = any> extends Pagination {
  totalData: number;
  totalPage: number;
  data: T;
}

export interface Pagination {
  page: number;
  limit: number;
}
