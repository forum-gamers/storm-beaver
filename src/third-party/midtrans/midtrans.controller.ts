import { Controller } from '@nestjs/common';
import { MidtransService } from './midtrans.service';
import { WalletService } from '../../modules/transactions/services/wallet.service';
import { UserService } from '../../modules/user/services/user.service';

@Controller('/third-party/mt')
export class MidtransController {
  constructor(
    private readonly midtransService: MidtransService,
    private readonly walletService: WalletService,
    private readonly userService: UserService,
  ) {}
}
