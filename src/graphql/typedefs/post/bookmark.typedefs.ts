export const BOOKMARK_TYPEDEFS = `#graphql
  type IBookmark {
    _id: String
    postId: String
    userId: String
    createdAt: String
    updatedAt: String
  }

  type Media {
    id: String
    type: String
    url: String
  }

  input PaginationWithPostId {
    page: Int
    limit: Int
    userId: String!
  }

  type Query {
    findMyBookmark(args: PaginationWithPostId!): [PostResponse]
  }

  type Mutation {
    createBookmark(postId: String!): IBookmark
    deleteBookmark(_id: String!): String
  }
`;
