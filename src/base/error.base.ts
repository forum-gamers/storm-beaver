export interface AppErrorProps {
  message: string;
  status: ErrorCode;
}

export default class AppError extends Error {
  constructor({ message, status }: AppErrorProps) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    this.name = status;
  }
}

export enum ErrorCode {
  BAD_REQUEST = 'BAD_REQUEST',
  INTERNAL_SERVER = 'INTERNAL_SERVER',
}
