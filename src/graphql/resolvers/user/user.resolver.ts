import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../../graphql.helper';
import { UserService } from '../../../modules/user/services/user.service';
import type {
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../../interfaces';
import type {
  EmailInput,
  IUser,
  LoginInput,
  RegisterInput,
  UserParams,
} from '../../../modules/user/interfaces/user.interfaces';
import errorHandling from '../../../middlewares/errorHandling.middleware';
import type { FileInput } from '../../../interfaces/request';
import { ImageService } from '../../../modules/image/services/image.service';
import {
  USER_BACKGROUND_FOLDER,
  USER_PROFILE_FOLDER,
} from '../../../constants/folder';
import { WalletService } from '../../../modules/transactions/services/wallet.service';
import { RedisService } from '../../../third-party/redis/redis.service';
import jwtUtils from '../../../utils/jwt.utils';

@Injectable()
export class UserResolver extends ResolverHelper implements ResolverInitiate {
  constructor(
    private readonly userService: UserService,
    private readonly imageService: ImageService,
    private readonly walletService: WalletService,
    private readonly redisService: RedisService,
  ) {
    super();
  }

  GenerateResolver(): ResolverObj {
    return {
      Query: {
        me: async (_: never, args: {}, { access_token }: GlobalContext) => {
          try {
            const { id } = jwtUtils.decodeToken(access_token);
            const cache = await this.redisService.getData<IUser>(`user:${id}`);
            if (cache) return cache;

            const user = await this.userService.me(access_token);
            this.redisService.setData(`user:${id}`, user);

            return user;
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
        getById: async (_: never, args: UserParams, ctx: GlobalContext) =>
          await this.userService.getById(args, ctx?.access_token),
      },
      Mutation: {
        register: async (_: never, { payload }: { payload: RegisterInput }) => {
          try {
            const { data, token } = await this.userService.register(payload);

            await this.walletService.createWallet({}, token);

            return data;
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
                folder: USER_PROFILE_FOLDER,
                content: base64,
              },
              access_token,
            );

            const result = await this.userService.changeProfile(
              { fileId: file_id, url },
              access_token,
            );
            this.redisService.resetData(
              `user:${jwtUtils.decodeToken(access_token).id}`,
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
                folder: USER_BACKGROUND_FOLDER,
                content: base64,
              },
              access_token,
            );

            const result = await this.userService.changeBackground(
              { fileId: file_id, url },
              access_token,
            );
            this.redisService.resetData(
              `user:${jwtUtils.decodeToken(access_token).id}`,
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
        changeVerified: async (_: never, { token }: { token: string }) => {
          try {
            this.redisService.resetData(
              `user:${jwtUtils.decodeToken(token).id}`,
            );
            return await this.userService.changeVerified({ token });
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
        resendEmailVerification: async (_: never, { email }: EmailInput) =>
          await this.userService.resendEmail({ email }),
      },
    };
  }
}
