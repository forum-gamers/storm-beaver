import {
  WebSocketGateway,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  WebSocketServer,
  type OnGatewayInit,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import type { Socket, Server } from 'socket.io';
import { config } from 'dotenv';
import { RoomService } from './services/room.service';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import jwtUtils from '../../utils/jwt.utils';
import AppError from '../../base/error.base';
import { Status } from '@grpc/grpc-js/build/src/constants';
import type { Chat, Room } from './interfaces/global.interface';
import { NEW_CHAT, NEW_ROOM } from './module.constant';

config();

@WebSocketGateway({ namespace: 'chat' })
export class ChatSocket
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  private readonly server: Server;
  private clients = new Map<string, Socket>();

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly roomService: RoomService,
  ) {}

  public async handleConnection(client: Socket, ...args: any[]) {
    try {
      const token = client.handshake.headers['access_token'];
      if (!token)
        throw new AppError({
          message: 'missing or invalid token',
          status: Status.PERMISSION_DENIED,
        });

      const { id } = jwtUtils.verifyToken(
        Array.isArray(token) ? token[0] : token,
      );
      if (!this.clients.get(id)) this.clients.set(id, client);
    } catch (err) {
      client.disconnect(true);
    }
  }

  public async handleDisconnect(client: Socket) {
    const token = client.handshake.headers['access_token'];
    if (token || token.length) {
      const { id } = jwtUtils.decodeToken(
        Array.isArray(token) ? token[0] : token,
      );
      this.clients.delete(id);
    }
    client.disconnect();
  }

  public afterInit(server: Server) {
    this.logger.info(`chat ws server started...`);
  }

  public sendNewRoom(room: Room) {
    for (const { userId } of room.users)
      if (this.clients.has(userId))
        this.clients.get(userId).emit(NEW_ROOM, room);
  }

  public async sendNewChat(chat: Chat, roomId: string, access_token: string) {
    const room = await this.roomService.getRoomById({ roomId }, access_token);
    if (room)
      for (const { userId } of room.users)
        if (this.clients.has(userId))
          this.clients?.get(userId).emit(NEW_CHAT, [chat, room]);
  }

  @SubscribeMessage(NEW_ROOM)
  public listenNewRoom(@MessageBody() room: Room) {
    for (const { userId } of room.users)
      if (this.clients.has(userId)) this.server.to(userId).emit(NEW_ROOM, room);
  }

  @SubscribeMessage(NEW_CHAT)
  public listenNewChat(@MessageBody() payload: [Chat, Room]) {
    for (const { userId } of payload[1].users)
      if (this.clients.has(userId))
        this.server.to(userId).emit(NEW_CHAT, payload[0]);
  }
}
