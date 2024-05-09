import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../graphql.helper';
import { UserService } from '../../modules/user/user.service';
import type {
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../interfaces';
import type {
  LoginInput,
  RegisterInput,
  UserParams,
} from '../../modules/user/user.interfaces';
import errorHandling from '../../middlewares/errorHandling.middleware';
import type { FileInput } from '../../interfaces/request';
import { ImageService } from '../../modules/image/image.service';

@Injectable()
export class UserResolver extends ResolverHelper implements ResolverInitiate {
  constructor(
    private readonly userService: UserService,
    private readonly imageService: ImageService,
  ) {
    super();
  }

  GenerateResolver(): ResolverObj {
    return {
      Query: {
        me: async (_: never, args: {}, ctx: GlobalContext) =>
          await this.userService.me(ctx?.access_token),
        getById: async (_: never, args: UserParams, ctx: GlobalContext) =>
          await this.userService.getById(args, ctx?.access_token),
      },
      Mutation: {
        register: async (_: never, { payload }: { payload: RegisterInput }) => {
          try {
            return await this.userService.register(payload);
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
        login: async (_: never, { payload }: { payload: LoginInput }) => {
          try {
            return await this.userService.login(payload);
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
        changeProfile: async (
          _: never,
          { payload: { filename, base64 } }: { payload: FileInput },
          { access_token }: GlobalContext,
        ) => {
          try {
            const { file_id, url } = await this.imageService.uploadImg(
              {
                filename,
                folder: 'user-profile',
                content: base64,
              },
              access_token,
            );

            const result = await this.userService.changeProfile(
              { fileId: file_id, url },
              access_token,
            );

            if (result !== 'success')
              await this.imageService.deleteFile(
                { file_id: result },
                access_token,
              );

            return url;
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
        changeBackground: async (
          _: never,
          { payload: { filename, base64 } }: { payload: FileInput },
          { access_token }: GlobalContext,
        ) => {
          try {
            const { file_id, url } = await this.imageService.uploadImg(
              {
                filename,
                folder: 'user-background',
                content: base64,
              },
              access_token,
            );

            const result = await this.userService.changeBackground(
              { fileId: file_id, url },
              access_token,
            );

            if (result !== 'success')
              await this.imageService.deleteFile(
                { file_id: result },
                access_token,
              );

            return url;
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
      },
    };
  }
}
