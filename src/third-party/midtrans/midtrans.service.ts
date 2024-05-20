import { Injectable } from '@nestjs/common';
import MtCore from '../../lib/midtrans.lib';
import type { TransactionType } from '../../interfaces';
import type { ChargeParameter } from 'midtrans-client';
import { TOPUP_ITEM_ID } from '../../constants/payment';
import type { TopUpPayload } from './midtrans.interface';
import { v4 } from 'uuid';

@Injectable()
export class MidtransService extends MtCore {
  public generateId(type: TransactionType) {
    return `FG-${v4()}-${this.generateString(3)}-${this.getTransactionType(type)}`;
  }

  private getTransactionType(type: TransactionType) {
    switch (type) {
      case 'Payment':
        return 'py';
      case 'Top up':
        return 'tp';
      default:
        return 'unk';
    }
  }

  public generateTopupParams = ({
    payment_type,
    amount,
    username,
    email,
    provider,
    phone,
  }: TopUpPayload): ChargeParameter => {
    const payload: ChargeParameter = {
      payment_type,
      transaction_details: {
        gross_amount: amount,
        order_id: this.generateId('Top up'),
      },
      customer_details: {
        first_name: username,
        email,
        phone,
      },
      item_details: [
        {
          id: TOPUP_ITEM_ID,
          price: amount,
          quantity: 1,
          name: 'Top up',
        },
      ],
    };

    if (payload.payment_type === 'bank_transfer')
      payload['bank_transfer'] = {
        bank: provider,
      };
    return payload;
  };

  public async chargeTransaction(body: ChargeParameter) {
    return await this.coreApi.charge(body);
  }

  private generateString(length: number) {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++)
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    return result;
  }
}
