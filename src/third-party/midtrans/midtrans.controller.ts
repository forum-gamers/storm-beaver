import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { MidtransService } from './midtrans.service';
import type { ChargeParameter } from 'midtrans-client';
import { NotificationSignatureParser } from '../../utils/pipes/notification.utils';
import type { Transaction } from '../../modules/transactions/interfaces/transaction.interface';
import { TransactionService } from '../../modules/transactions/services/transaction.service';
import jwtUtils from '../../utils/jwt.utils';

@Controller('/third-party/mt')
export class MidtransController {
  constructor(
    private readonly midtransService: MidtransService,
    private readonly transactionService: TransactionService,
  ) {}

  @Post('notification')
  @HttpCode(200)
  public async notification(
    @Body('signature_key', NotificationSignatureParser)
    transaction: Transaction | null,
    @Body() payload: ChargeParameter,
  ) {
    if (!transaction) throw new NotFoundException('transaction not found');
    const data = await this.midtransService.notification(payload);

    switch (data.transaction_status) {
      case 'settlement': {
        await this.transactionService.successTopup(
          { signature: transaction?.signature },
          jwtUtils.createAppToken(),
        );
        break;
      }
      case 'cancel':
      case 'deny':
      case 'expire':
      case 'failure': {
        await this.transactionService.changeTopupTransactionStatus(
          {
            signature: transaction?.signature,
            status:
              data.transaction_status === 'failure'
                ? 'failed'
                : data.transaction_status,
          },
          jwtUtils.createAppToken(),
        );
        break;
      }
      default:
        throw new NotImplementedException('unhandled transaction');
    }

    return { message: 'success' };
  }
}
