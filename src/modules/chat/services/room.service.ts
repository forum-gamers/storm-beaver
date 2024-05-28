import { Injectable, type OnModuleInit } from '@nestjs/common';
import { GRPCBASE } from '../../../base/grpc.base.service';
import type {
  CreateRoomInput,
  IRoomService,
  PaginationWithRoomType,
  RoomByType,
  RoomId,
  UserRoomInput,
} from '../interfaces/room.interface';
import { join } from 'path';
import { credentials } from '@grpc/grpc-js';
import type {
  DataWithMetadata,
  Message,
  Pagination,
  RepeatedUserRoom,
  Room,
} from '../interfaces/global.interface';

@Injectable()
export class RoomService extends GRPCBASE implements OnModuleInit {
  private roomService: IRoomService;
  public onModuleInit() {
    this.loadRoomDefinition();
  }

  private loadRoomDefinition() {
    const Service = this.loadService(
      join(__dirname, '../proto/room.proto'),
      'room',
      'RoomService',
    );

    this.roomService = new Service(
      process.env.GRPC_CHAT_SERVICE ?? 'localhost:50055',
      credentials.createInsecure(),
    ) as IRoomService;
  }

  public async createRoom(args: CreateRoomInput, access_token: string) {
    return new Promise<Room>((resolve, reject) => {
      this.roomService.CreateRoom(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async deleteUser(args: UserRoomInput, access_token: string) {
    return new Promise<Message>((resolve, reject) => {
      this.roomService.DeleteUser(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async leaveRoom(args: RoomId, access_token: string) {
    return new Promise<Message>((resolve, reject) => {
      this.roomService.LeaveRoom(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async setAdmin(args: UserRoomInput, access_token: string) {
    return new Promise<RepeatedUserRoom>((resolve, reject) => {
      this.roomService.SetAdmin(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async downAdmin(args: UserRoomInput, access_token: string) {
    return new Promise<RepeatedUserRoom>((resolve, reject) => {
      this.roomService.DownAdmin(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async getUserRoom(args: PaginationWithRoomType, access_token: string) {
    return new Promise<DataWithMetadata<RoomByType>>((resolve, reject) => {
      this.roomService.GetUserRoom(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async getRoomById(args: RoomId, access_token: string) {
    return new Promise<Room>((resolve, reject) => {
      this.roomService.GetRoomById(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }
}
