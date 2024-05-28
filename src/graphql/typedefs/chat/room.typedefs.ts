export const ROOM_TYPEDEFS = `#graphql
  type Room {
    type: String
    users: [UserRoom]
    description: String
    image: String
    imageId: String
    name: String
    owner: String
    _id: String
    chat: [Chat]
  }

  type UserRoom {
    userId: String
    addedAt: String
    role: String
  }

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

  input CreateRoomInput {
    users: [String]!
    description: String
    name: String
    file: FileInput
  }

  input FileInput {
    base64: String!
    filename: String!
  }

  type RoomByType {
    Group: [Room]
    Private: [Room]
  }

  type Query {
    getUserRoom(page: Int, limit: Int,type: String): RoomByType
    getRoomById(roomId: String!): Room
  }

  type Mutation {
    createRoom(args: CreateRoomInput!): Room
    deleteUser(roomId: String!, userId: String!): String
    leaveRoom(roomId: String!): String
    setAdmin(roomId: String!, userId: String!): [UserRoom]
    downAdmin(roomId: String!, userId: String!): [UserRoom]
  }
`;
