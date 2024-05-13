import { Injectable, type OnModuleInit } from '@nestjs/common';
import { GRPCBASE } from '../../../base/grpc.base.service';
import { join } from 'path';
import { credentials } from '@grpc/grpc-js';
import {
  CommentForm,
  DeleteReplyPayload,
  IReply,
  IReplyService,
  Messages,
} from '../interfaces/reply.interfaces';

@Injectable()
export class ReplyService extends GRPCBASE implements OnModuleInit {
  private replyService: IReplyService;
  public onModuleInit() {
    this.loadReplyDefinition();
  }

  private loadReplyDefinition() {
    const Service = this.loadService(
      join(__dirname, '../proto/reply.proto'),
      'reply',
      'ReplyService',
    );

    this.replyService = new Service(
      process.env.GRPC_POST_SERVICE ?? 'localhost:50052',
      credentials.createInsecure(),
    ) as IReplyService;
  }

  public async createReply(args: CommentForm, access_token: string) {
    return new Promise<IReply>((resolve, reject) => {
      this.replyService.CreateReply(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async deleteReply(args: DeleteReplyPayload, access_token: string) {
    return new Promise<Messages>((resolve, reject) => {
      this.replyService.DeleteReply(
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
