import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../../../graphql/graphql.helper';
import type {
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../../interfaces';
import { CommentService } from '../../../modules/post/services/comment.service';
import type {
  CommentForm,
  CommentIdPayload,
  PaginationWithPostId,
} from '../../../modules/post/interfaces/comment.interfaces';

@Injectable()
export class CommentResolver
  extends ResolverHelper
  implements ResolverInitiate
{
  constructor(private readonly commentService: CommentService) {
    super();
  }

  public GenerateResolver(): ResolverObj {
    return {
      Query: {
        findPostComment: async (
          _: never,
          {
            args: { page = 1, limit = 20, postId },
          }: { args: PaginationWithPostId },
          { access_token }: GlobalContext,
        ) =>
          (
            await this.commentService.findPostComment(
              { page, limit, postId },
              access_token,
            )
          ).data,
      },
      Mutation: {
        createComment: async (
          _: never,
          { args }: { args: CommentForm },
          { access_token }: GlobalContext,
        ) => await this.commentService.createComment(args, access_token),
        deleteComment: async (
          _: never,
          { _id }: CommentIdPayload,
          { access_token }: GlobalContext,
        ) => await this.commentService.deleteComment({ _id }, access_token),
      },
    };
  }
}
