import { Injectable } from '@nestjs/common';
import MtCore from '../../lib/midtrans.lib';

@Injectable()
export class MidtransService extends MtCore {}
