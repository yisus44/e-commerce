import { BaseError } from './base-error';

export class BadRequestError extends BaseError {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
