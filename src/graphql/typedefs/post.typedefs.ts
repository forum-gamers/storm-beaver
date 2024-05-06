export const POST_TYPEDEFS = `#graphql
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

  input getPostParams {
    tags: [String]
    userIds: [String]
    page: Int
    limit: Int
  }

  type Query {
    getPublicContent(args: getPostParams): [PostResponse]
  }
`;
