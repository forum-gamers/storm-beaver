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

  type TopTag {
    _id: String
    count: Int
    posts: [String]
  }

  input getPostParams {
    tags: [String]
    userIds: [String]
    page: Int
    limit: Int
  }

  input FileInput {
    base64: String!
    filename: String!
  }

  input CreatePostInput {
    files: [FileInput]
    text: String
    allowComment: Boolean
    privacy: String
  }

  input GetPostParamsById {
    page: Int
    limit: Int
    userId: String!
  }

  type Query {
    getPublicContent(args: getPostParams): [PostResponse]
    getMyPost(page: Int,limit: Int): [PostResponse]
    getLikedPost(page: Int,limit: Int): [PostResponse]
    getUserMedia(page: Int,limit: Int): [PostResponse]
    getUserPostById(args: GetPostParamsById!): [PostResponse]
    getMediaByUserId(args: GetPostParamsById!): [PostResponse]
    getUserLikedPost(args: GetPostParamsById!): [PostResponse]
  }

  type Mutation {
    createPost(args: CreatePostInput!): PostResponse
    deletePost(postId: String!): String
  }
`;
