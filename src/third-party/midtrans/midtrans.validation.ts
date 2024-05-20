import { Injectable } from '@nestjs/common';
import type {
  BankProvider,
  PaymentProvider,
  PaymentType,
  WalletProvider,
} from '../../interfaces';
import { BANK_PROVIDERS, EWALLET_PROVIDERS } from '../../constants/payment';

@Injectable()
export class MidtransValidation {
  public isValidPaymentProvider(type: PaymentType, provider: PaymentProvider) {
    switch (type) {
      case 'bank':
        return BANK_PROVIDERS.includes(provider as BankProvider);
      //   case 'ewallet': TODO provider ewallet payment
      //     return EWALLET_PROVIDERS.includes(provider as WalletProvider);
      default:
        return false;
    }
  }
}
