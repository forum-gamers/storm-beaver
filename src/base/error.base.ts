import { Status } from '@grpc/grpc-js/build/src/constants';

export interface AppErrorProps {
  message: string;
  status: Status;
}

export default class AppError extends Error {
  constructor({ message, status }: AppErrorProps) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    this.name = Status[status];
  }
}
