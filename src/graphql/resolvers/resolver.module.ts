import { Module } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { UserResolver } from './user/user.resolver';
import { PostService } from '../../modules/post/services/post.service';
import { PostResolver } from './post/post.resolver';
import { ImageService } from '../../modules/image/image.service';
import { LikeService } from '../../modules/post/services/like.service';
import { LikeResolver } from './post/like.resolver';
import { BookmarkService } from '../../modules/post/services/bookmark.service';
import { BookmarkResolver } from './post/bookmark.resolver';

@Module({
  providers: [
    UserService,
    UserResolver,
    PostService,
    PostResolver,
    ImageService,
    LikeService,
    LikeResolver,
    BookmarkService,
    BookmarkResolver,
  ],
  exports: [UserResolver, PostResolver, LikeResolver, BookmarkResolver],
})
export class ResolveModule {}
