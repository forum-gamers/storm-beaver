import { GraphQLError } from 'graphql';
import AppError from '../base/error.base';

export default function errorHandling(err: AppError) {
  return new GraphQLError(err.message, {
    extensions: {
      code: err.name,
    },
  });
}
