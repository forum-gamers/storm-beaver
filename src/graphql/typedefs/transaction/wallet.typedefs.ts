export const WALLET_TYPEDEFS = `#graphql
  type Wallet {
    id: String
    userId: String
    balance: Float
    coin: Float
    createdAt: String
    updatedAt: String
  }

  input TopUpInput {
    amount: Float!
    paymentType: String
    provider: String!
    transactionType: String!
    currency: String
    description: String
    detail: String
  }

  type ChargeResp {
    order_id: String
    gross_amount: String
    payment_type: String
    transaction_time: String
    permata_va_number: String
    transaction_id: String
    transaction_status: String
    status_message: String
    va_numbers: [VaNumber]
  }

  type VaNumber {
    bank: String
    va_number: String
  }

  type Query {
    findMyWallet: Wallet
  }

  type Mutation {
    topup(args: TopUpInput!): ChargeResp
  }
`;
