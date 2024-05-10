export const COMMENT_TYPEDEFS = `#graphql
  type IComment {
    _id: String
    text: String
    userId: String
    postId: String
    createdAt: String
    updatedAt: String
    reply: [Reply]
  }

  type Reply {
    _id: String
    userId: String
    text: String
    createdAt: String
    updatedAt: String
  }

  input CommentForm {
    text: String!
    postId: String!
  }

  input PaginationWithPostId {
    postId: String!
    page: Int
    limit: Int
  }

  type Query {
    findPostComment(args: PaginationWithPostId!): [IComment]
  }

  type Mutation {
    createComment(args: CommentForm!): IComment
    deleteComment(_id: String!): String
  }
`;
