import { Module } from '@nestjs/common';
import { WalletService } from './services/wallet.service';
import { TransactionService } from './services/transaction.service';

@Module({
  providers: [WalletService, TransactionService],
  exports: [WalletService, TransactionService],
})
export class TransactionModule {}
