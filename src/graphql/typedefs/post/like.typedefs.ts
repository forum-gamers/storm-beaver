export const LIKE_TYPEDEFS = `#graphql 
  type ILike {
    _id: String
    userId: String
    postId: String
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    createLike(postId: String!): ILike
    deleteLike(postId: String!): String
  }
`;
