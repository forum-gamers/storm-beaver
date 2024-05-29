import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../../../graphql/graphql.helper';
import type {
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../../interfaces';
import errorHandling from '../../../middlewares/errorHandling.middleware';
import { FollowService } from '../../../modules/user/services/follow.service';
import type { Pagination } from '../../../modules/user/interfaces/follow.interface';
import { UserService } from '../../../modules/user/services/user.service';
import AppError from '../../../base/error.base';
import { Status } from '@grpc/grpc-js/build/src/constants';

@Injectable()
export class FollowResolver extends ResolverHelper implements ResolverInitiate {
  constructor(
    private readonly followService: FollowService,
    private readonly userService: UserService,
  ) {
    super();
  }

  public GenerateResolver(): ResolverObj {
    return {
      Query: {
        getMyFollowing: async (
          _: never,
          { page = 1, limit = 10 }: Pagination,
          { access_token }: GlobalContext,
        ) => {
          try {
            const follows = await this.followService.getMyFollow(
              { page, limit },
              access_token,
            );
            if (!follows.datas.length)
              throw new AppError({
                message: 'data not found',
                status: Status.NOT_FOUND,
              });

            const users = await this.userService.getMultipleUsers(
              { ids: follows.datas.map(({ followingId }) => followingId) },
              access_token,
            );

            return follows.datas.map((el) => ({
              ...el,
              user: users.find((user) => el.followingId === user.id),
            }));
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
        getMyFollower: async (
          _: never,
          { page = 1, limit = 10 }: Pagination,
          { access_token }: GlobalContext,
        ) => {
          try {
            const follows = await this.followService.getMyFollower(
              { page, limit },
              access_token,
            );
            if (!follows.datas.length)
              throw new AppError({
                message: 'data not found',
                status: Status.NOT_FOUND,
              });

            const users = await this.userService.getMultipleUsers(
              { ids: follows.datas.map(({ followerId }) => followerId) },
              access_token,
            );

            return follows.datas.map((el) => ({
              ...el,
              user: users.find((user) => el.followerId === user.id),
            }));
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
      },
      Mutation: {
        followUser: async (
          _: never,
          { targetId }: { targetId: string },
          { access_token }: GlobalContext,
        ) => {
          try {
            return await this.followService.followUser(
              { id: targetId },
              access_token,
            );
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
      },
    };
  }
}
