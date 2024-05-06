import { Module } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { UserResolver } from './user.resolver';
import { PostService } from '../../modules/post/services/post.service';
import { PostResolver } from './post.resolver';
import { ImageService } from '../../modules/image/image.service';

@Module({
  providers: [
    UserService,
    UserResolver,
    PostService,
    PostResolver,
    ImageService,
  ],
  exports: [UserResolver, PostResolver],
})
export class ResolveModule {}
