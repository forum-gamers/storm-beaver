import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { GraphqlController } from './graphql/graphql.controller';
import { UserModule } from './modules/user/user.module';
import { ResolveModule } from './graphql/resolvers/resolver.module';

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
    ResolveModule,
  ],
  controllers: [GraphqlController],
})
export class AppModule {}
