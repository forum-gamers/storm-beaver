import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { LikeService } from './services/like.service';

@Module({
  providers: [PostService, LikeService],
})
export class PostModule {}
