export const MEMBER_TYPEDEFS = `#graphql
  type Mutation {
    joinCommunity(communityId: String!): String
    leaveCommunity(communityId: String!): String
  }
`;
