import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../graphql.helper';
import type {
  FileHeader,
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../interfaces';
import { UserService } from '../../modules/user/user.service';
import { PostService } from '../../modules/post/services/post.service';
import { ImageService } from '../../modules/image/image.service';
import type {
  CreatePostInput,
  GetPostParams,
  Pagination,
  PaginationWithUserId,
} from '../../modules/post/post.interfaces';
import type { PostResolverResp } from '../../interfaces/post.response';
import errorHandling from '../../middlewares/errorHandling.middleware';
import AppError from '../../base/error.base';
import { Status } from '@grpc/grpc-js/build/src/constants';

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
        getUserPostById: async (
          _: never,
          {
            args: { page = 1, limit = 20, userId },
          }: { args: PaginationWithUserId },
          { access_token }: GlobalContext,
        ) => {
          try {
            const [{ data }, user] = await Promise.all([
              this.postService.getUserPostById(
                { page, limit, userId },
                access_token,
              ),
              this.userService.getById({ id: userId }, access_token),
            ]);
            if (!data.length || !user)
              throw new AppError({
                message: 'data not found',
                status: Status.NOT_FOUND,
              });

            return data.map((el) => ({ ...el, user }));
          } catch (err) {
            this.LogImportantError(err);
            return [];
          }
        },
        getMediaByUserId: async (
          _: never,
          {
            args: { page = 1, limit = 20, userId },
          }: { args: PaginationWithUserId },
          { access_token }: GlobalContext,
        ) => {
          try {
            const [{ data }, user] = await Promise.all([
              this.postService.getMediaByUserId(
                { page, limit, userId },
                access_token,
              ),
              this.userService.getById({ id: userId }, access_token),
            ]);
            if (!data.length || !user)
              throw new AppError({
                message: 'data not found',
                status: Status.NOT_FOUND,
              });

            return data.map((el) => ({ ...el, user }));
          } catch (err) {
            this.LogImportantError(err);
            return [];
          }
        },
        getUserLikedPost: async (
          _: never,
          {
            args: { page = 1, limit = 20, userId },
          }: { args: PaginationWithUserId },
          { access_token }: GlobalContext,
        ) => {
          try {
            const [{ data }, user] = await Promise.all([
              this.postService.getUserLikedPost(
                { page, limit, userId },
                access_token,
              ),
              this.userService.getById({ id: userId }, access_token),
            ]);
            if (!data.length || !user)
              throw new AppError({
                message: 'data not found',
                status: Status.NOT_FOUND,
              });

            return data.map((el) => ({ ...el, user }));
          } catch (err) {
            this.LogImportantError(err);
            return [];
          }
        },
      },
      Mutation: {
        createPost: async (
          _: never,
          {
            args: { files: fileInput, text, allowComment, privacy } = {
              files: [],
              text: '',
              allowComment: false,
              privacy: '',
            },
          }: { args: CreatePostInput },
          { access_token }: GlobalContext,
        ) => {
          try {
            const files: FileHeader[] = [];
            if (!!fileInput.length) {
              if (fileInput.length > 4)
                throw new AppError({
                  message: 'max upload file is 4',
                  status: Status.INVALID_ARGUMENT,
                });

              const { datas } = await this.imageService.bulkUpload(
                {
                  folder: 'post',
                  files: fileInput.map((el) => ({
                    content: el.base64,
                    filename: el.filename,
                  })),
                },
                access_token,
              );
              files.push(
                ...datas.map((data) => ({
                  url: data.url,
                  contentType: data.content_type,
                  fileId: data.file_id,
                })),
              );
            }

            const [post, user] = await Promise.all([
              this.postService.createPost(
                {
                  files,
                  text,
                  allowComment,
                  privacy,
                },
                access_token,
              ),
              this.userService.me(access_token),
            ]);

            return {
              ...post,
              user,
              countLike: 0,
              countShare: 0,
              isLiked: false,
              isShared: false,
              totalData: 1,
            };
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
        deletePost: async (
          _: never,
          { postId }: { postId: string },
          { access_token }: GlobalContext,
        ) => {
          const { datas } = await this.postService.deletePost(
            { _id: postId },
            access_token,
          );

          if (!!datas.length)
            this.imageService.bulkDelete({ file_ids: datas }, access_token);

          return 'success';
        },
      },
    };
  }
}
