import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../../../graphql/graphql.helper';
import type {
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../../interfaces';
import { LikeService } from '../../../modules/post/services/like.service';
import type { LikeIdPayload } from '../../../modules/post/interfaces/like.interfaces';

@Injectable()
export class LikeResolver extends ResolverHelper implements ResolverInitiate {
  constructor(private readonly likeService: LikeService) {
    super();
  }

  public GenerateResolver(): ResolverObj {
    return {
      Query: {},
      Mutation: {
        createLike: async (
          _: never,
          { postId }: LikeIdPayload,
          { access_token }: GlobalContext,
        ) => await this.likeService.createLike({ postId }, access_token),
        deleteLike: async (
          _: never,
          { postId }: LikeIdPayload,
          { access_token }: GlobalContext,
        ) => await this.likeService.deleteLike({ postId }, access_token),
      },
    };
  }
}
