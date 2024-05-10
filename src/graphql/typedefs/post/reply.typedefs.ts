export const REPLY_TYPEDEFS = `#graphql
  type IReply {
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

  input DeleteReplyPayload {
    commentId: String!
    replyId: String!
  }

  type Mutation {
    createReply(args: CommentForm!): IReply
    deleteReply(args: DeleteReplyPayload!): String
  }
`;
