import type { PaymentType } from 'midtrans-client';
import type { BankProvider } from '../../interfaces';

export interface TopUpPayload {
  payment_type: PaymentType;
  amount: number;
  username: string;
  email: string;
  phone: string;
  provider?: BankProvider;
}
