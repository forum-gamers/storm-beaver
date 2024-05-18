import { Module } from '@nestjs/common';
import { MidtransService } from './midtrans/midtrans.service';
import { MidtransController } from './midtrans/midtrans.controller';
import { WalletService } from '../modules/transactions/services/wallet.service';
import { UserService } from '../modules/user/services/user.service';

@Module({
  providers: [MidtransService, WalletService, UserService],
  controllers: [MidtransController],
})
export class ThirdPartyModule {}
