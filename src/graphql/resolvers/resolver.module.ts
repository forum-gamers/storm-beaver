import { Module } from '@nestjs/common';
import { UserService } from '../../modules/user/services/user.service';
import { UserResolver } from './user/user.resolver';
import { PostService } from '../../modules/post/services/post.service';
import { PostResolver } from './post/post.resolver';
import { ImageService } from '../../modules/image/services/image.service';
import { LikeService } from '../../modules/post/services/like.service';
import { LikeResolver } from './post/like.resolver';
import { BookmarkService } from '../../modules/post/services/bookmark.service';
import { BookmarkResolver } from './post/bookmark.resolver';
import { CommentService } from '../../modules/post/services/comment.service';
import { CommentResolver } from './post/comment.resolver';
import { ReplyService } from '../../modules/post/services/reply.service';
import { ReplyResolver } from './post/reply.resolver';
import { CommunityService } from '../../modules/community/services/community.service';
import { CommunityResolver } from './community/community.resolver';
import { MemberService } from '../../modules/community/services/member.service';
import { MemberResolver } from './community/member.resolver';
import { VendorService } from '../../modules/user/services/vendor.service';
import { VendorResolver } from './user/vendor.resolver';

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
    CommentService,
    CommentResolver,
    ReplyService,
    ReplyResolver,
    CommunityService,
    CommunityResolver,
    MemberService,
    MemberResolver,
    VendorService,
    VendorResolver,
  ],
  exports: [
    UserResolver,
    PostResolver,
    LikeResolver,
    BookmarkResolver,
    CommentResolver,
    ReplyResolver,
    CommunityResolver,
    MemberResolver,
    VendorResolver,
  ],
})
export class ResolverModule {}
