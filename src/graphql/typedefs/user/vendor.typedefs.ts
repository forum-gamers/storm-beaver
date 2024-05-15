export const VENDOR_TYPEDEFS = `#graphql
  type Vendor {
    id: Int
    userId: String
    name: String
    description: String
    createdAt: String
    updatedAt: String
    imageUrl: String
    imageId: String
    backgroundImageUrl: String
    backgroundImageId: String
  }

  input FileInput {
    base64: String!
    filename: String!
  }

  input CreateVendorInput {
    name: String!
    description: String
    image: FileInput
    background: FileInput
  }

  type Query {
    findMyVendorAccount: Vendor
  }

  type Mutation {
    createVendor(args: CreateVendorInput!): Vendor
    updateVendorImg(args: FileInput!): Vendor
    updateVendorBg(args: FileInput!): Vendor
    updateVendorDesc(desc: String!): Vendor
  }
`;
