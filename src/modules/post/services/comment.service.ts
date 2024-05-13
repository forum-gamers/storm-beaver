import { Injectable, type OnModuleInit } from '@nestjs/common';
import { GRPCBASE } from '../../../base/grpc.base.service';
import type {
  CommentForm,
  CommentIdPayload,
  CommentRespWithMetadata,
  IComment,
  ICommentService,
  Messages,
  PaginationWithPostId,
} from '../interfaces/comment.interfaces';
import { join } from 'path';
import { credentials } from '@grpc/grpc-js';

@Injectable()
export class CommentService extends GRPCBASE implements OnModuleInit {
  private commentService: ICommentService;
  public onModuleInit() {
    this.loadCommentDefinition();
  }

  private loadCommentDefinition() {
    const Service = this.loadService(
      join(__dirname, '../proto/comment.proto'),
      'comment',
      'CommentService',
    );

    this.commentService = new Service(
      process.env.GRPC_POST_SERVICE ?? 'localhost:50052',
      credentials.createInsecure(),
    ) as ICommentService;
  }

  public async createComment(args: CommentForm, access_token: string) {
    return new Promise<IComment>((resolve, reject) => {
      this.commentService.CreateComment(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async deleteComment(args: CommentIdPayload, access_token: string) {
    return new Promise<Messages>((resolve, reject) => {
      this.commentService.DeleteComment(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async findPostComment(
    args: PaginationWithPostId,
    access_token: string,
  ) {
    return new Promise<CommentRespWithMetadata>((resolve, reject) => {
      this.commentService.FindPostComment(
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
