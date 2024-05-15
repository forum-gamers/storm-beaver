export const COMMUNITY_TYPEDEFS = `#graphql
  type Community {
    id: String
    name: String
    imageUrl: String
    imageId: String
    description: String
    owner: String
    createdAt: String
    updatedAt: String
    backgroundUrl: String
    backgroundId: String
  }

  input CreateCommunityInput {
    name: String!
    image: FileInput
    desc: String
    background: FileInput
  }

  input FileInput {
    base64: String!
    filename: String!
  }

  type Query {
    findById(communityId: String!): Community
  }

  type Mutation {
    createCommunity(args: CreateCommunityInput!): Community
    deleteCommunity(communityId: String!): String
    updateImg(communityId: String!, file:FileInput!): Community
    updateBackground(communityId: String!, file:FileInput!): Community
    updateDesc(communityId: String!, text: String!): Community
    changeOwnership(communityId: String!, targetId: String!): Community
  }
`;
