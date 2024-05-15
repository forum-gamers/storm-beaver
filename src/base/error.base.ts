import { Status } from '@grpc/grpc-js/build/src/constants';

export interface AppErrorProps<T = any> {
  message: string;
  status: Status;
  data?: T;
}

export default class AppError<T = any> extends Error {
  public data?: T;
  constructor({ message, status, data }: AppErrorProps<T>) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    this.name =
      Object.keys(Status).find((el) => Status[el] === status) ?? 'UNKNOWN';
    this.data = data;
  }
}
