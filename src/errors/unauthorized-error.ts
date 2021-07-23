import { BaseError } from './base-error';

export class UnauthorizedError extends BaseError {
  statusCode = 401;
  constructor() {
    super('User is not authorized');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: 'User is not authorized',
      },
    ];
  }
}
