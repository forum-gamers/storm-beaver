import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../graphql.helper';
import { UserService } from '../../modules/user/user.service';
import type {
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../interfaces';
import type { LoginInput, RegisterInput } from '../../modules/user/interfaces';
import errorHandling from '../../middlewares/errorHandling.middleware';

@Injectable()
export class UserResolver extends ResolverHelper implements ResolverInitiate {
  constructor(private readonly userService: UserService) {
    super();
  }

  GenerateResolver(): ResolverObj {
    return {
      Query: {
        me: () => {
          return {};
        },
      },
      Mutation: {
        register: async (_: never, { payload }: { payload: RegisterInput }) => {
          try {
            return await this.userService.register(payload);
          } catch (err) {
            this.LogImportantError(err);
            throw new Error(err.message);
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
      },
    };
  }
}
