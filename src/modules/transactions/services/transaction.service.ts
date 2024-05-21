import { Injectable, type OnModuleInit } from '@nestjs/common';
import { GRPCBASE } from '../../../base/grpc.base.service';
import type {
  ChangeStatusInput,
  CreateTransactionInput,
  ITransactionService,
  SignatureInput,
  Transaction,
  TransactionIdInput,
} from '../interfaces/transaction.interface';
import { join } from 'path';
import { credentials } from '@grpc/grpc-js';
import type { Wallet } from '../interfaces/wallet.interface';

@Injectable()
export class TransactionService extends GRPCBASE implements OnModuleInit {
  private transactionService: ITransactionService;

  public onModuleInit() {
    this.loadTransactionDefinition();
  }

  private loadTransactionDefinition() {
    const Service = this.loadService(
      join(__dirname, '../proto/transaction.proto'),
      'transaction',
      'TransactionService',
    );

    this.transactionService = new Service(
      process.env.GRPC_TRANSACTION_SERVICE ?? 'localhost:50059',
      credentials.createInsecure(),
    ) as ITransactionService;
  }

  public async createTransaction(
    args: CreateTransactionInput,
    access_token: string,
  ) {
    return new Promise<Transaction>((resolve, reject) => {
      this.transactionService.CreateTransaction(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async cancelTransaction(
    args: TransactionIdInput,
    access_token: string,
  ) {
    return new Promise<Transaction>((resolve, reject) => {
      this.transactionService.CancelTransaction(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async findOneBySignature(args: SignatureInput, access_token: string) {
    return new Promise<Transaction>((resolve, reject) => {
      this.transactionService.FindOneBySignature(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async successTopup(args: SignatureInput, access_token: string) {
    return new Promise<Wallet>((resolve, reject) => {
      this.transactionService.SuccessTopup(
        args,
        this.generateMetadata({ access_token }),
        (err, resp) => {
          if (err) return reject(this.convertError(err));

          resolve(resp);
        },
      );
    });
  }

  public async changeTopupTransactionStatus(
    args: ChangeStatusInput,
    access_token: string,
  ) {
    return new Promise<Transaction>((resolve, reject) => {
      this.transactionService.ChangeStatusTopupTransaction(
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
