import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
}

//this is just to tell ts that we are adding a new propierty to the request type
declare global {
  namespace Express {
    interface Request {
      currentUserAuthToken?: UserPayload;
    }
  }
}

export function currentUserAuthToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUserAuthToken = payload;
  } catch (error) {
    console.error(error);
  }
  next();
}
