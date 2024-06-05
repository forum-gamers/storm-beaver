import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { VendorService } from './services/vendor.service';
import { FollowService } from './services/follow.service';

@Module({
  providers: [UserService, VendorService, FollowService],
  exports: [UserService, VendorService, FollowService],
})
export class UserModule {}
