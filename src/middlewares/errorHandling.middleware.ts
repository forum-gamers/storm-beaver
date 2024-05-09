import { GraphQLError } from 'graphql';
import AppError from '../base/error.base';
import { Status } from '@grpc/grpc-js/build/src/constants';

export default function errorHandling(err: AppError | any) {
  if (!(err instanceof AppError))
    err = new AppError({
      message: 'unexpected error',
      status: Status.UNKNOWN,
    });

  return new GraphQLError(err.message, {
    extensions: {
      code: err.name,
    },
  });
}
