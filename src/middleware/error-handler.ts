import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/base-error';

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  } else {
    console.log(err);
    return res
      .status(500)
      .send({ errors: [{ message: 'Unknow error from the server' }] });
  }
}

export { errorHandler };
