import { Injectable, type OnModuleInit } from '@nestjs/common';
import { GRPCBASE } from '../../../base/grpc.base.service';
import type {
  IWalletService,
  NoArgument,
  Wallet,
} from '../interfaces/wallet.interface';
import { join } from 'path';
import { credentials } from '@grpc/grpc-js';

@Injectable()
export class WalletService extends GRPCBASE implements OnModuleInit {
  private walletService: IWalletService;
  public onModuleInit() {
    this.loadWalletDefinition();
  }

  private loadWalletDefinition() {
    const Service = this.loadService(
      join(__dirname, '../proto/wallet.proto'),
      'wallet',
      'WalletService',
    );
    this.walletService = new Service(
      process.env.GRPC_TRANSACTION_SERVICE ?? 'localhost:50059',
      credentials.createInsecure(),
    ) as IWalletService;
  }

  public async createWallet(args: NoArgument, access_token: string) {
    return new Promise<Wallet>((resolve, reject) => {
      this.walletService.CreateWallet(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async findMyWallet(args: NoArgument, access_token: string) {
    return new Promise<Wallet>((resolve, reject) => {
      this.walletService.FindMyWallet(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }
}
