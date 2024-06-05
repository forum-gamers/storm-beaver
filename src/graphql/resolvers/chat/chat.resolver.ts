import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../../../graphql/graphql.helper';
import type {
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../../interfaces';
import { ChatService } from '../../../modules/chat/services/chat.service';
import errorHandling from '../../../middlewares/errorHandling.middleware';
import { ImageService } from '../../../modules/image/services/image.service';
import type { CreateChatInput as CreateChatProps } from '../../../interfaces/chat.request';
import { ChatSocket } from '../../../modules/chat/chat.gateway';
import { CHAT_FILE_FOLDER } from '../../../constants/folder';
import type { CreateChatInput } from '../../../modules/chat/interfaces/chat.interface';

@Injectable()
export class ChatResolver extends ResolverHelper implements ResolverInitiate {
  constructor(
    private readonly chatService: ChatService,
    private readonly imageService: ImageService,
    private readonly chatSocket: ChatSocket,
  ) {
    super();
  }

  public GenerateResolver(): ResolverObj {
    return {
      Query: {},
      Mutation: {
        createChat: async (
          _: never,
          {
            args: { roomId, message = '', file = null },
          }: { args: CreateChatProps },
          { access_token }: GlobalContext,
        ) => {
          let isError = false;
          let payload: CreateChatInput = { message, roomId, file: null };
          try {
            if (file) {
              const { file_id, url, content_type } =
                await this.imageService.uploadImg(
                  {
                    folder: CHAT_FILE_FOLDER,
                    filename: file.filename,
                    content: file.base64,
                  },
                  access_token,
                );

              payload['file']['contentType'] = content_type;
              payload['file']['fileId'] = file_id;
              payload['file']['url'] = url;
            }

            const chat = await this.chatService.createChat(
              payload,
              access_token,
            );
            this.chatSocket.sendNewChat(chat, roomId, access_token);

            return chat;
          } catch (err) {
            isError = true;
            this.LogImportantError(err);
            throw errorHandling(err);
          } finally {
            if (isError && payload?.file?.fileId)
              this.imageService.deleteFile(
                { file_id: payload.file.fileId },
                access_token,
              );
          }
        },
      },
    };
  }
}
