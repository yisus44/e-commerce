import { BaseError } from './base-error';

export class RouteNotFoundError extends BaseError {
  statusCode = 404;
  constructor() {
    super('Route not found');
    Object.setPrototypeOf(this, RouteNotFoundError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: 'API Route not found',
      },
    ];
  }
}
