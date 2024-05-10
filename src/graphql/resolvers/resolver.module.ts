import { Module } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { UserResolver } from './user/user.resolver';
import { PostService } from '../../modules/post/services/post.service';
import { PostResolver } from './post/post.resolver';
import { ImageService } from '../../modules/image/image.service';
import { LikeService } from '../../modules/post/services/like.service';
import { LikeResolver } from './post/like.resolver';

@Module({
  providers: [
    UserService,
    UserResolver,
    PostService,
    PostResolver,
    ImageService,
    LikeService,
    LikeResolver,
  ],
  exports: [UserResolver, PostResolver, LikeResolver],
})
export class ResolveModule {}
