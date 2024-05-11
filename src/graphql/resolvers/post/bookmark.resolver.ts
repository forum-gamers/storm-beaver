import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../../../graphql/graphql.helper';
import type {
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../../interfaces';
import type {
  IdPayload,
  PaginationWithPostId,
  PostIdPayload,
} from '../../../modules/post/interfaces/bookmark.interfaces';
import { BookmarkService } from '../../../modules/post/services/bookmark.service';
import AppError from '../../../base/error.base';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { UserService } from '../../../modules/user/user.service';

@Injectable()
export class BookmarkResolver
  extends ResolverHelper
  implements ResolverInitiate
{
  constructor(
    private readonly bookmarkService: BookmarkService,
    private readonly userService: UserService,
  ) {
    super();
  }

  public GenerateResolver(): ResolverObj {
    return {
      Query: {
        findMyBookmark: async (
          _: never,
          { args }: { args: PaginationWithPostId },
          { access_token }: GlobalContext,
        ) => {
          try {
            const { data } = await this.bookmarkService.findMyBookmark(
              args,
              access_token,
            );
            if (!data.length)
              throw new AppError({
                message: 'data not found',
                status: Status.NOT_FOUND,
              });

            const users = await this.userService.getMultipleUsers(
              { ids: data.map(({ userId }) => userId) },
              access_token,
            );

            return data.map((el) => ({
              ...el,
              user: users.find((user) => user.id === el.userId),
            }));
          } catch (err) {
            this.LogImportantError(err);
            return [];
          }
        },
      },
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
