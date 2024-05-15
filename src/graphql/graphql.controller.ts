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
import { USER_TYPEDEFS } from './typedefs/user/user.typedefs';
import { UserResolver } from './resolvers/user/user.resolver';
import parseReq from '../middlewares/parseReq.middleware';
import { config } from 'dotenv';
import { PostResolver } from './resolvers/post/post.resolver';
import { POST_TYPEDEFS } from './typedefs/post/post.typedefs';
import { LIKE_TYPEDEFS } from './typedefs/post/like.typedefs';
import { LikeResolver } from './resolvers/post/like.resolver';
import { BOOKMARK_TYPEDEFS } from './typedefs/post/bookmark.typedefs';
import { BookmarkResolver } from './resolvers/post/bookmark.resolver';
import { COMMENT_TYPEDEFS } from './typedefs/post/comment.typedefs';
import { CommentResolver } from './resolvers/post/comment.resolver';
import { ReplyResolver } from './resolvers/post/reply.resolver';
import { REPLY_TYPEDEFS } from './typedefs/post/reply.typedefs';
import { COMMUNITY_TYPEDEFS } from './typedefs/community/community.typedefs';
import { CommunityResolver } from './resolvers/community/community.resolver';

config();

const isProduction = process.env.NODE_ENV === 'production';

@Controller()
export class GraphqlController implements OnModuleDestroy, OnModuleInit {
  private apolloServer: ApolloServer;
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly userResolver: UserResolver,
    private readonly postResolver: PostResolver,
    private readonly likeResolver: LikeResolver,
    private readonly bookmarkResolver: BookmarkResolver,
    private readonly commentResolver: CommentResolver,
    private readonly replyResolver: ReplyResolver,
    private readonly communityResolver: CommunityResolver,
  ) {}

  private createSchema() {
    return makeExecutableSchema({
      typeDefs: [
        USER_TYPEDEFS,
        POST_TYPEDEFS,
        LIKE_TYPEDEFS,
        BOOKMARK_TYPEDEFS,
        COMMENT_TYPEDEFS,
        REPLY_TYPEDEFS,
        COMMUNITY_TYPEDEFS,
      ],
      resolvers: [
        this.userResolver.GenerateResolver(),
        this.postResolver.GenerateResolver(),
        this.likeResolver.GenerateResolver(),
        this.bookmarkResolver.GenerateResolver(),
        this.commentResolver.GenerateResolver(),
        this.replyResolver.GenerateResolver(),
      ],
    });
  }

  public async onModuleInit() {
    const logInfo = (msg: string) => {
      this.logger.info(msg);
    };
    this.apolloServer = new ApolloServer<BaseContext>({
      schema: this.createSchema(),
      introspection: !isProduction,
      includeStacktraceInErrorResponses: !isProduction,
      status400ForVariableCoercionErrors: true,
      logger: this.logger,
      plugins: [
        {
          async requestDidStart(
            context: GraphQLRequestContext<GlobalContext>,
          ): Promise<GraphQLRequestListener<GlobalContext> | void> {
            const { request } = context;
            if (request.operationName !== 'IntrospectionQuery')
              logInfo(`${request.http?.method}:${request.operationName}`);
            return {
              async didResolveOperation(
                requestContext: GraphQLRequestContext<GlobalContext>,
              ) {
                await parseReq(requestContext);
              },
            };
          },
        },
      ],
      formatError: (formatted) => ({
        ...formatted,
        message: formatted.message,
        locations: undefined,
        path: undefined,
      }),
    });
    this.logger.info(`apollo server running...`);
    await this.apolloServer.start();
  }

  public async onModuleDestroy() {
    await this.apolloServer.stop();
    this.logger.info('apollo server shutdown...');
  }

  @All()
  public async graphql(@Req() req: Request, @Res() res: Response) {
    await executeHTTPGraphQLRequest({
      req,
      res,
      apolloServer: this.apolloServer,
      context: async () => {
        const {
          headers: { access_token, v },
        } = Raw(req);
        return {
          access_token,
          verify: v === 'true',
        };
      },
    });
  }
}
