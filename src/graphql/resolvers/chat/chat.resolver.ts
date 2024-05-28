import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../../../graphql/graphql.helper';
import type { ResolverInitiate, ResolverObj } from '../../../interfaces';
import { ChatService } from '../../../modules/chat/services/chat.service';
import type { CreateChatInput as CreateChatInputs } from '../../../modules/chat/interfaces/chat.interface';
import errorHandling from '../../../middlewares/errorHandling.middleware';
import { ImageService } from '../../../modules/image/services/image.service';
import type { CreateChatInput } from '../../../interfaces/chat.request';

@Injectable()
export class ChatResolver extends ResolverHelper implements ResolverInitiate {
  constructor(
    private readonly chatService: ChatService,
    private readonly imageService: ImageService,
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
          }: { args: CreateChatInput },
        ) => {
          try {
            if (file) {
            }
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
      },
    };
  }
}
