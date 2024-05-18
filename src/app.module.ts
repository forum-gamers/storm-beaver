import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { GraphqlController } from './graphql/graphql.controller';
import { UserModule } from './modules/user/user.module';
import { ResolverModule } from './graphql/resolvers/resolver.module';
import { ImageModule } from './modules/image/image.module';
import { PostModule } from './modules/post/post.module';
import { CommunityModule } from './modules/community/community.module';
import { TransactionModule } from './modules/transactions/transaction.module';
import { ThirdPartyModule } from './third-party/thirdparty.module';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(
              (info) => `${info.timestamp} ${info.level}: ${info.message}`,
            ),
          ),
        }),
      ],
    }),
    UserModule,
    ResolverModule,
    ImageModule,
    PostModule,
    CommunityModule,
    TransactionModule,
    ThirdPartyModule,
  ],
  controllers: [GraphqlController],
})
export class AppModule {}
