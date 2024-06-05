import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';
import { MidtransService } from './midtrans/midtrans.service';
import { MidtransController } from './midtrans/midtrans.controller';
import { UserService } from '../modules/user/services/user.service';
import { MidtransValidation } from './midtrans/midtrans.validation';
import { RedisService } from './redis/redis.service';
import { TransactionService } from '../modules/transactions/services/transaction.service';
import { BodyJsonParser } from '../middlewares/bodyJsonParser.middleware';
import { UrlEncodedParser } from '../middlewares/urlEncodedParser.middleware';

@Module({
  providers: [
    MidtransService,
    UserService,
    MidtransValidation,
    RedisService,
    TransactionService,
    BodyJsonParser,
    UrlEncodedParser,
  ],
  controllers: [MidtransController],
  exports: [RedisService, MidtransService],
})
export class ThirdPartyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BodyJsonParser)
      .forRoutes(MidtransController)
      .apply(UrlEncodedParser)
      .forRoutes(MidtransController);
  }
}
