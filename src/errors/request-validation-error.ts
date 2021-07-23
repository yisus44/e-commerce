import { ValidationError } from 'express-validator';

import { BaseError } from './base-error';

export class RequestValidationError extends BaseError {
  statusCode: number = 400;
  constructor(public errors: ValidationError[]) {
    super('Invalid data in the request');
    this.errors = errors;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
