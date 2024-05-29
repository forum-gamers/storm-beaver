export const FOLLOW_TYPEDEFS = `#graphql
  type Follow {
    id: Int
    followingId: String
    followerId: String
    createdAt: String
    updatedAt: String
  }

  type FollowWithUser {
    id: Int
    followingId: String
    followerId: String
    createdAt: String
    updatedAt: String
    user: IUser
  }

  type Query {
    getMyFollowing(page: Int, limit: Int): [FollowWithUser]
    getMyFollower(page: Int,limit: Int): [FollowWithUser]
  }

  type Mutation {
    followUser(targetId: String!): Follow
  }
`;
