import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { LikeService } from './services/like.service';
import { BookmarkService } from './services/bookmark.service';
import { CommentService } from './services/comment.service';
import { ReplyService } from './services/reply.service';

@Module({
  providers: [
    PostService,
    LikeService,
    BookmarkService,
    CommentService,
    ReplyService,
  ],
  exports: [
    PostService,
    LikeService,
    BookmarkService,
    CommentService,
    ReplyService,
  ],
})
export class PostModule {}
