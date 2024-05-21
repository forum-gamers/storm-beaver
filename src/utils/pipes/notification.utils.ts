import {
  type ArgumentMetadata,
  BadRequestException,
  Injectable,
  type PipeTransform,
} from '@nestjs/common';
import { TransactionService } from '../../modules/transactions/services/transaction.service';
import jwtUtils from '../jwt.utils';

@Injectable()
export class NotificationSignatureParser implements PipeTransform {
  public async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) throw new BadRequestException('signature_key is required');
    try {
      return await this.transactionService.findOneBySignature(
        { signature: value },
        jwtUtils.createAppToken(),
      );
    } catch (err) {
      return null;
    }
  }

  constructor(private readonly transactionService: TransactionService) {}
}
