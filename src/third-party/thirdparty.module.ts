import { Module } from '@nestjs/common';
import { MidtransService } from './midtrans/midtrans.service';
import { MidtransController } from './midtrans/midtrans.controller';
import { WalletService } from '../modules/transactions/services/wallet.service';
import { UserService } from '../modules/user/services/user.service';
import { MidtransValidation } from './midtrans/midtrans.validation';
import { RedisService } from './redis/redis.service';
import { redisProvider } from './redis/redis.provider';

@Module({
  providers: [
    MidtransService,
    WalletService,
    UserService,
    MidtransValidation,
    RedisService,
    redisProvider,
  ],
  controllers: [MidtransController],
})
export class ThirdPartyModule {}
