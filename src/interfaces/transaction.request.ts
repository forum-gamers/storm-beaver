import type {
  Currency,
  PaymentProvider,
  PaymentType,
  TransactionType,
} from '.';

export interface TopUpInput {
  amount: number;
  paymentType: PaymentType;
  provider: PaymentProvider;
  transactionType: TransactionType;
  currency: Currency;
  description?: string;
  detail?: string;
}
