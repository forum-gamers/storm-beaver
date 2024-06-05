import { Module } from '@nestjs/common';
import { UserResolver } from './user/user.resolver';
import { PostResolver } from './post/post.resolver';
import { LikeResolver } from './post/like.resolver';
import { BookmarkResolver } from './post/bookmark.resolver';
import { CommentResolver } from './post/comment.resolver';
import { ReplyResolver } from './post/reply.resolver';
import { CommunityResolver } from './community/community.resolver';
import { MemberResolver } from './community/member.resolver';
import { VendorResolver } from './user/vendor.resolver';
import { WalletResolver } from './transaction/wallet.resolver';
import { MidtransValidation } from '../../third-party/midtrans/midtrans.validation';
import { RoomResolver } from './chat/room.resolver';
import { ChatResolver } from './chat/chat.resolver';
import { FollowResolver } from './user/follow.resolver';
import { ChatModule } from '../../modules/chat/chat.module';
import { UserModule } from '../../modules/user/user.module';
import { ImageModule } from '../../modules/image/image.module';
import { ThirdPartyModule } from '../../third-party/thirdparty.module';
import { PostModule } from '../../modules/post/post.module';
import { CommunityModule } from '../../modules/community/community.module';
import { TransactionModule } from '../../modules/transactions/transaction.module';

@Module({
  imports: [
    ChatModule,
    UserModule,
    ImageModule,
    ThirdPartyModule,
    PostModule,
    CommunityModule,
    TransactionModule,
  ],
  providers: [
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
    MidtransValidation,
    RoomResolver,
    ChatResolver,
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
