import { Injectable, type OnModuleInit } from '@nestjs/common';
import { GRPCBASE } from '../../../base/grpc.base.service';
import type {
  CommunityIdInput,
  IMemberService,
  Message,
} from '../interfaces/member.interface';
import { join } from 'path';
import { credentials } from '@grpc/grpc-js';

@Injectable()
export class MemberService extends GRPCBASE implements OnModuleInit {
  private memberService: IMemberService;
  public onModuleInit() {
    this.loadMemberDefinition();
  }

  private loadMemberDefinition() {
    const Service = this.loadService(
      join(__dirname, '../proto/member.proto'),
      'member',
      'MemberService',
    );

    this.memberService = new Service(
      process.env.GRPC_COMMUNITY_SERVICE ?? 'localhost:50054',
      credentials.createInsecure(),
    ) as IMemberService;
  }

  public async joinCommunity(args: CommunityIdInput, access_token: string) {
    return new Promise<Message>((resolve, reject) => {
      this.memberService.JoinCommunity(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async leaveCommunity(args: CommunityIdInput, access_token: string) {
    return new Promise<Message>((resolve, reject) => {
      this.memberService.LeaveCommunity(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }
}
