export const CHAT_TYPEDEFS = `#graphql
  type Chat {
    _id: String
    senderId: String
    message: String
    image: String
    imageId: String
    mediaType: String
    isRead: Boolean
    status: String
    createdAt: String
    updatedAt: String
  }

  input CreateChatInput {
    roomId: String!
    message: String
    file: FileHeader
  }

  input FileInput {
    base64: String!
    filename: String!
  }

  type Mutation {
    createChat(args: CreateChatInput!): Chat
  }
`;
