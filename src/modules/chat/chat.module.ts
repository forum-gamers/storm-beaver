import { Module } from '@nestjs/common';
import { RoomService } from './services/room.service';
import { ChatService } from './services/chat.service';
import { ChatSocket } from './chat.gateway';

@Module({
  providers: [RoomService, ChatService, ChatSocket],
  exports: [ChatSocket, RoomService, ChatService],
})
export class ChatModule {}
