import { GraphQLError } from 'graphql';

export enum ErrorCode {
  BAD_REQUEST = 'BAD_REQUEST',
  INTERNAL_SERVER = 'INTERNAL_SERVER',
}

export default function errorHandling(message: string, code: ErrorCode) {
  return new GraphQLError(message, {
    extensions: {
      code,
    },
  });
}
