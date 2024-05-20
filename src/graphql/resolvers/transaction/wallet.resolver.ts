import { Injectable } from '@nestjs/common';
import { ResolverHelper } from '../../../graphql/graphql.helper';
import type {
  BankProvider,
  GlobalContext,
  ResolverInitiate,
  ResolverObj,
  WalletProvider,
} from '../../../interfaces';
import errorHandling from '../../../middlewares/errorHandling.middleware';
import type { TopUpInput } from '../../../interfaces/transaction.request';
import { TransactionService } from '../../../modules/transactions/services/transaction.service';
import { WalletService } from '../../../modules/transactions/services/wallet.service';
import { MidtransService } from '../../../third-party/midtrans/midtrans.service';
import { MidtransValidation } from '../../../third-party/midtrans/midtrans.validation';
import AppError from '../../../base/error.base';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { UserService } from '../../../modules/user/services/user.service';
import { BANK_PROVIDERS } from '../../../constants/payment';
import { sha512 } from 'js-sha512';

@Injectable()
export class WalletResolver extends ResolverHelper implements ResolverInitiate {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly walletService: WalletService,
    private readonly midtransService: MidtransService,
    private readonly midtransValidation: MidtransValidation,
    private readonly userService: UserService,
  ) {
    super();
  }

  public GenerateResolver(): ResolverObj {
    return {
      Query: {},
      Mutation: {
        topup: async (
          _: never,
          {
            args: {
              amount,
              paymentType = 'bank',
              provider,
              currency = 'IDR',
              transactionType,
              ...rest
            },
          }: { args: TopUpInput },
          { access_token }: GlobalContext,
        ) => {
          try {
            if (
              !this.midtransValidation.isValidPaymentProvider(
                paymentType,
                provider,
              )
            )
              throw new AppError({
                message: 'invalid payment type',
                status: Status.INVALID_ARGUMENT,
              });

            const me = await this.userService.me(access_token);
            const charge = await this.midtransService.chargeTransaction(
              this.midtransService.generateTopupParams({
                amount,
                username: me.fullname,
                phone: me.phoneNumber,
                email: me.email,
                payment_type: BANK_PROVIDERS.includes(provider as BankProvider)
                  ? 'bank_transfer'
                  : (provider as WalletProvider),
                provider: provider as BankProvider,
              }),
            );

            await this.transactionService.createTransaction(
              {
                amount,
                type: transactionType,
                currency,
                signature: sha512(
                  charge.order_id +
                    '200' +
                    charge.gross_amount +
                    process.env.MIDTRANS_SERVER_KEY,
                ),
                ...rest,
              },
              access_token,
            );

            return charge;
          } catch (err) {
            this.LogImportantError(err);
            throw errorHandling(err);
          }
        },
      },
    };
  }
}
