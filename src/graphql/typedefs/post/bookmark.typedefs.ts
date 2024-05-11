export const BOOKMARK_TYPEDEFS = `#graphql
  type IBookmark {
    _id: String
    postId: String
    userId: String
    createdAt: String
    updatedAt: String
  }

  type PostResponse {
    _id: String
    userId: String
    text: String
    media: [Media]
    allowComment: Boolean
    createdAt: String
    updatedAt: String
    countLike: Int
    countShare: Int
    isLiked: Boolean
    isShared: Boolean
    tags: [String]
    privacy: String
    totalData: Int
    user: IUser
  }

  type IUser {
    id: String
    fullname: String
    username: String
    email: String
    isVerified: Boolean
    bio: String
    imageUrl: String
    imageId: String
    backgroundImageUrl: String
    backgroundImageId: String
    status: String
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
