import { Module } from '@nestjs/common';
import { CommunityService } from './services/community.service';
import { MemberService } from './services/member.service';

@Module({
  providers: [CommunityService, MemberService],
  exports: [CommunityService, MemberService],
})
export class CommunityModule {}
