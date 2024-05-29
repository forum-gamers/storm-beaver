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
import { WalletService } from '../../modules/transactions/services/wallet.service';
import { WalletResolver } from './transaction/wallet.resolver';
import { TransactionService } from '../../modules/transactions/services/transaction.service';
import { MidtransService } from '../../third-party/midtrans/midtrans.service';
import { MidtransValidation } from '../../third-party/midtrans/midtrans.validation';
import { RedisService } from '../../third-party/redis/redis.service';
import { RoomResolver } from './chat/room.resolver';
import { RoomService } from '../../modules/chat/services/room.service';
import { ChatService } from '../../modules/chat/services/chat.service';
import { ChatResolver } from './chat/chat.resolver';
import { FollowService } from 'src/modules/user/services/follow.service';
import { FollowResolver } from './user/follow.resolver';

@Module({
  providers: [
    RedisService,
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
    WalletService,
    WalletResolver,
    TransactionService,
    MidtransService,
    MidtransValidation,
    RoomService,
    RoomResolver,
    ChatService,
    ChatResolver,
    FollowService,
    FollowResolver,
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
    WalletResolver,
    RoomResolver,
    ChatResolver,
    FollowResolver,
  ],
})
export class ResolverModule {}
