import {BaseError} from"./base-error"

export class RouteNotFoundError extends BaseError{
  statusCode=404;
  constructor() {
    super('Product or User');
    Object.setPrototypeOf(this, RouteNotFoundError.prototype);
  }
  
  serializeErrors() {
    return [
      {
        message: 'Product or User not found',
      },
    ];
  }
}