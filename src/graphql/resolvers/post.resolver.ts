import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../graphql.helper';
import type {
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../interfaces';
import { UserService } from '../../modules/user/user.service';
import { PostService } from '../../modules/post/services/post.service';
import { ImageService } from '../../modules/image/image.service';
import type {
  GetPostParams,
  Pagination,
} from '../../modules/post/post.interfaces';
import type { PostResolverResp } from '../../interfaces/post.response';

@Injectable()
export class PostResolver extends ResolverHelper implements ResolverInitiate {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly imageService: ImageService,
  ) {
    super();
  }

  GenerateResolver(): ResolverObj {
    return {
      Query: {
        getPublicContent: async (
          _: never,
          {
            args = {
              page: 1,
              limit: 20,
              userIds: [],
              tags: [],
            },
          }: { args: GetPostParams },
          { access_token }: GlobalContext,
        ): Promise<PostResolverResp[]> => {
          try {
            const datas = await this.postService.getPublicContent(
              args,
              access_token,
            );
            if (!datas.data.length) throw new Error('data not found');

            const users = await this.userService.getMultipleUsers(
              { ids: datas.data.map(({ userId }) => userId) },
              access_token,
            );

            return datas.data.map((el) => ({
              ...el,
              user: users.find((user) => user.id === el.userId),
            }));
          } catch (err) {
            this.LogImportantError(err);
            return [];
          }
        },
        getMyPost: async (
          _: never,
          { page = 1, limit = 20 }: Pagination,
          { access_token }: GlobalContext,
        ): Promise<PostResolverResp[]> => {
          try {
            const datas = await this.postService.getUserPost(
              { page, limit },
              access_token,
            );
            if (!datas.data.length) throw new Error('data not found');

            const user = await this.userService.me(access_token);

            return datas.data.map((el) => ({ ...el, user }));
          } catch (err) {
            this.LogImportantError(err);
            return [];
          }
        },
        getLikedPost: async (
          _: never,
          { page = 1, limit = 20 }: Pagination,
          { access_token }: GlobalContext,
        ): Promise<PostResolverResp[]> => {
          try {
            const datas = await this.postService.getLikedPost(
              { page, limit },
              access_token,
            );
            if (!datas.data.length) throw new Error('data not found');

            const users = await this.userService.getMultipleUsers(
              { ids: datas.data.map(({ userId }) => userId) },
              access_token,
            );

            return datas.data.map((el) => ({
              ...el,
              user: users.find((user) => user.id === el.userId),
            }));
          } catch (err) {
            this.LogImportantError(err);
            return [];
          }
        },
        getUserMedia: async (
          _: never,
          { page = 1, limit = 20 }: Pagination,
          { access_token }: GlobalContext,
        ): Promise<PostResolverResp[]> => {
          try {
            const datas = await this.postService.getUserMedia(
              { page, limit },
              access_token,
            );
            if (!datas.data.length) throw new Error('data not found');

            const users = await this.userService.getMultipleUsers(
              { ids: datas.data.map(({ userId }) => userId) },
              access_token,
            );

            return datas.data.map((el) => ({
              ...el,
              user: users.find((user) => user.id === el.userId),
            }));
          } catch (err) {
            this.LogImportantError(err);
            return [];
          }
        },
      },
    };
  }
}
