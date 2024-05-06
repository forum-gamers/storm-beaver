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
import errorHandling, {
  ErrorCode,
} from '../../middlewares/errorHandling.middleware';

@Injectable()
export class UserResolver extends ResolverHelper implements ResolverInitiate {
  constructor(private readonly userService: UserService) {
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
            throw errorHandling(err.details, ErrorCode.BAD_REQUEST);
          }
        },
        login: async (_: never, { payload }: { payload: LoginInput }) => {
          try {
            return await this.userService.login(payload);
          } catch (err) {
            this.LogImportantError(err);
            console.log(err);
            throw errorHandling(err, ErrorCode.BAD_REQUEST);
          }
        },
      },
    };
  }
}
