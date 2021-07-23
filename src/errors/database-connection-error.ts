import {BaseError} from"./base-error"

export class DatabaseConnectionError extends BaseError{
  statusCode=500;
  constructor() {
    super('Product or User');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  
  serializeErrors() {
    return [
      {
        message: 'Database could not be reached',
      },
    ];
  }
}