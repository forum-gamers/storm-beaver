import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../../../graphql/graphql.helper';
import type {
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../../interfaces';
import type {
  CommentForm,
  DeleteReplyPayload,
} from '../../../modules/post/interfaces/reply.interfaces';
import { ReplyService } from '../../../modules/post/services/reply.service';

@Injectable()
export class ReplyResolver extends ResolverHelper implements ResolverInitiate {
  constructor(private readonly replyService: ReplyService) {
    super();
  }

  public GenerateResolver(): ResolverObj {
    return {
      Query: {},
      Mutation: {
        createReply: async (
          _: never,
          { args }: { args: CommentForm },
          { access_token }: GlobalContext,
        ) => await this.replyService.createReply(args, access_token),
        deleteReply: async (
          _: never,
          { args }: { args: DeleteReplyPayload },
          { access_token }: GlobalContext,
        ) => (await this.replyService.deleteReply(args, access_token)).message,
      },
    };
  }
}
