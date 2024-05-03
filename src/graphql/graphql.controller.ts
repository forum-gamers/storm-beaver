import {
  ApolloServer,
  type GraphQLRequestListener,
  type GraphQLRequestContext,
  type BaseContext,
} from '@apollo/server';
import {
  All,
  Controller,
  type OnModuleDestroy,
  type OnModuleInit,
  Req,
  Res,
  Inject,
} from '@nestjs/common';
import {
  executeHTTPGraphQLRequest,
  Raw,
  type Request,
  type Response,
} from '@node-libraries/nest-apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { GlobalContext } from '../interfaces';

@Controller()
export class GraphqlController implements OnModuleDestroy, OnModuleInit {
  private apolloServer: ApolloServer;
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  private createSchema() {
    return makeExecutableSchema({
      typeDefs: [],
      resolvers: [],
    });
  }

  public onModuleInit() {
    const logInfo = (msg: string) => {
      this.logger.info(msg);
    };
    this.apolloServer = new ApolloServer<BaseContext>({
      schema: this.createSchema(),
      introspection: process.env.NODE_ENV !== 'production',
      plugins: [
        {
          async requestDidStart(
            context: GraphQLRequestContext<GlobalContext>,
          ): Promise<GraphQLRequestListener<GlobalContext> | void> {
            const { request } = context;
            if (request.operationName !== 'IntrospectionQuery')
              logInfo(`${request.http?.method}:${request.operationName}`);
            return {};
          },
        },
      ],
    });
    this.logger.info(`apollo server running...`);
    return this.apolloServer.start();
  }

  public onModuleDestroy() {
    this.apolloServer.stop();
  }

  @All()
  public async graphql(@Req() req: Request, @Res() res: Response) {
    await executeHTTPGraphQLRequest({
      req,
      res,
      apolloServer: this.apolloServer,
      context: async () => {
        const rawReq = Raw(req);
        return {
          req: {
            ...rawReq,
            access_token: rawReq.headers.access_token,
            v: rawReq.headers.v === 'true',
          },
          res: Raw(res),
        };
      },
    });
  }
}
