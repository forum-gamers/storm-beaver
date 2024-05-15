export const USER_TYPEDEFS = `#graphql
  type access_token {
    access_token: String!
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

  input RegisterInput {
    fullname: String!
    username: String!
    email: String!
    password: String!
    role: String
    confirmPassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
    as: String
  }

  input FileInput {
    base64: String!
    filename: String!
  }

  type Query {
    me: IUser!
    getById(id: String!): IUser!
  }

  type Mutation {
    register(payload: RegisterInput!): IUser!
    login(payload: LoginInput!): String!
    changeProfile(payload: FileInput!): String!
    changeBackground(payload: FileInput!): String!
    changeVerified(token: String!): String
    resendEmailVerification(email: String!): String
  }
`;
