import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../../../graphql/graphql.helper';
import type {
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../../interfaces';
import type {
  IdPayload,
  PostIdPayload,
} from '../../../modules/post/interfaces/bookmark.interfaces';
import { BookmarkService } from '../../../modules/post/services/bookmark.service';

@Injectable()
export class BookmarkResolver
  extends ResolverHelper
  implements ResolverInitiate
{
  constructor(private readonly bookmarkService: BookmarkService) {
    super();
  }

  public GenerateResolver(): ResolverObj {
    return {
      Query: {},
      Mutation: {
        createBookmark: async (
          _: never,
          { postId }: PostIdPayload,
          { access_token }: GlobalContext,
        ) =>
          await this.bookmarkService.createBookmark({ postId }, access_token),
        deleteBookmark: async (
          _: never,
          { _id }: IdPayload,
          { access_token }: GlobalContext,
        ) =>
          (await this.bookmarkService.deleteBookmark({ _id }, access_token))
            .message,
      },
    };
  }
}
