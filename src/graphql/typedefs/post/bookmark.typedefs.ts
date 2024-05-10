export const BOOKMARK_TYPEDEFS = `#graphql
  type IBookmark {
    _id: String
    postId: String
    userId: String
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    createBookmark(postId: String!): IBookmark
    deleteBookmark(_id: String!): String
  }
`;
