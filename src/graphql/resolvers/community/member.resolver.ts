import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../../../graphql/graphql.helper';
import type {
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
} from '../../../interfaces';
import { MemberService } from '../../../modules/community/services/member.service';
import type { CommunityIdInput } from '../../../modules/community/interfaces/member.interface';

@Injectable()
export class MemberResolver extends ResolverHelper implements ResolverInitiate {
  constructor(private readonly memberService: MemberService) {
    super();
  }

  public GenerateResolver(): ResolverObj {
    return {
      Query: {},
      Mutation: {
        joinCommunity: async (
          _: never,
          { communityId }: CommunityIdInput,
          { access_token }: GlobalContext,
        ) =>
          await this.memberService.joinCommunity({ communityId }, access_token),
        leaveCommunity: async (
          _: never,
          { communityId }: CommunityIdInput,
          { access_token }: GlobalContext,
        ) =>
          await this.memberService.leaveCommunity(
            { communityId },
            access_token,
          ),
      },
    };
  }
}
