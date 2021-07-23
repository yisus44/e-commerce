import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';

import { userRouter } from './routes/userRouter';
import { productRouter } from './routes/productRouter';
import { errorHandler } from './middleware/error-handler';

import { RouteNotFoundError } from './errors/route-not-found-error';
import cookieSession from 'cookie-session';

const app = express();

// middlewares and security stuff
app.use(helmet());
app.use(express.json());

app.set('trust proxy', 1); // trust first proxy

app.use(
  cookieSession({
    secure: false,
    signed: false,
  })
);
//routes
app.use(userRouter);
app.use(productRouter);

app.all('*', async (req: Request, res: Response, next: NextFunction) => {
  throw new RouteNotFoundError();
});
app.use(errorHandler);
///
export { app };
