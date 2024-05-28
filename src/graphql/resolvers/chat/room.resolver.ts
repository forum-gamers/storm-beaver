import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../../../graphql/graphql.helper';
import type {
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../../interfaces';
import { RoomService } from '../../../modules/chat/services/room.service';
import type {
  RoomId,
  UserRoomInput,
  CreateRoomInput as CreateRoomInputs,
  RoomByType,
} from '../../../modules/chat/interfaces/room.interface';
import errorHandling from '../../../middlewares/errorHandling.middleware';
import type {
  Pagination,
  RoomType,
} from '../../../modules/chat/interfaces/global.interface';
import { ImageService } from '../../../modules/image/services/image.service';
import type { CreateRoomInput } from '../../../interfaces/chat.request';
import { ROOM_IMAGE_FOLDER } from '../../../constants/folder';

@Injectable()
export class RoomResolver extends ResolverHelper implements ResolverInitiate {
  constructor(
    private readonly roomService: RoomService,
    private readonly imageService: ImageService,
  ) {
    super();
  }

  public GenerateResolver(): ResolverObj {
    return {
      Query: {
        getUserRoom: async (
          _: never,
          {
            page = 1,
            limit = 10,
            type = 'All',
          }: Pagination & { type: RoomType | 'All' },
          { access_token }: GlobalContext,
        ): Promise<RoomByType> => {
          try {
            return (
              await this.roomService.getUserRoom(
                { page, limit, type },
                access_token,
              )
            ).data;
          } catch (err) {
            this.LogImportantError(err);
            return { Private: [], Group: [] };
          }
        },
        getRoomById: async (
          _: never,
          { roomId }: RoomId,
          { access_token }: GlobalContext,
        ) => {
          try {
            return await this.roomService.getRoomById({ roomId }, access_token);
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
      },
      Mutation: {
        createRoom: async (
          _: never,
          {
            args: { file = null, users = [], description = '', name = '' },
          }: { args: CreateRoomInput },
          { access_token }: GlobalContext,
        ) => {
          try {
            let payload: CreateRoomInputs = {
              name,
              description,
              users,
            };
            if (file) {
              const { file_id, url, content_type } =
                await this.imageService.uploadImg(
                  {
                    filename: file.filename,
                    content: file.base64,
                    folder: ROOM_IMAGE_FOLDER,
                  },
                  access_token,
                );
              payload['file']['url'] = url;
              payload['file']['fileId'] = file_id;
              payload['file']['contentType'] = content_type;
            }
            return await this.roomService.createRoom(payload, access_token);
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
        deleteUser: async (
          _: never,
          { roomId, userId }: UserRoomInput,
          { access_token }: GlobalContext,
        ) => {
          try {
            return (
              await this.roomService.deleteUser(
                { roomId, userId },
                access_token,
              )
            ).message;
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
        leaveRoom: async (
          _: never,
          { roomId }: RoomId,
          { access_token }: GlobalContext,
        ) => {
          try {
            return (await this.roomService.leaveRoom({ roomId }, access_token))
              .message;
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
        setAdmin: async (
          _: never,
          { roomId, userId }: UserRoomInput,
          { access_token }: GlobalContext,
        ) => {
          try {
            return (
              await this.roomService.setAdmin({ roomId, userId }, access_token)
            ).users;
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
        downAdmin: async (
          _: never,
          { roomId, userId }: UserRoomInput,
          { access_token }: GlobalContext,
        ) => {
          try {
            return (
              await this.roomService.downAdmin({ roomId, userId }, access_token)
            ).users;
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
      },
    };
  }
}
