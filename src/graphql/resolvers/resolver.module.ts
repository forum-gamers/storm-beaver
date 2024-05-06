import { Module } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserService, UserResolver],
  exports: [UserResolver],
})
export class ResolveModule {}
