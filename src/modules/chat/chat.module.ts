import { Module } from '@nestjs/common';
import { RoomService } from './services/room.service';

@Module({
  providers: [RoomService],
})
export class ChatModule {}
