import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Password } from '../services/Password';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middleware/validate-request';
import { requireAuth } from '../middleware/require-auth';
import { currentUserAuthToken } from '../middleware/currentAuth';
const userRouter = express.Router();

userRouter.post(
  '/api/signup',
  [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password')
      .isLength({ min: 8, max: 50 })
      .withMessage('Password must be between 4 and 20 characters long'),
    body('country')
      .isLength({ min: 2 })
      .withMessage('The name of the country must have at least 2 characters'),
  ],
  validateRequest,
  async function (req: Request, res: Response) {
    const isAlreadyRegister = await User.findOne({ email: req.body.email });

    if (isAlreadyRegister) {
      throw new BadRequestError('Email already used');
    }

    const hashedPassword: string = await Password.hashPassword(
      req.body.password,
      10
    );
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      country: req.body.email,
      username: req.body.username,
      age: req.body.age,
    });

    await user.save();

    const userJWT = await jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJWT,
    };

    res.status(201).send({ user });
  }
);

userRouter.post(
  '/api/signin',
  [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password')
      .isLength({ min: 8, max: 50 })
      .withMessage('Password must be between 4 and 20 characters long'),
  ],
  validateRequest,
  async function (req: Request, res: Response) {
    const user = await User.findOne({ email: req.body.email });
    const match = await Password.checkPassword(
      req.body.password,
      user.password
    );
    if (!match) {
      throw new BadRequestError('Invalid credential provided');
    }
    const userJWT = await jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJWT,
    };
    res.status(200).send({ user });
  }
);

userRouter.put(
  '/api/user',
  currentUserAuthToken,
  requireAuth,
  validateRequest,
  async function (req: Request, res: Response) {
    //@ts-ignore
    const { id } = jwt.verify(req.session.jwt, process.env.JWT_KEY);
    if (req.body.password) {
      const hashedPassword: string = await Password.hashPassword(
        req.body.password,
        10
      );
      req.body.password = hashedPassword;
    }
    const query = User.findByIdAndUpdate({ _id: id }, req.body);
    const user = await query.exec();
    res.status(200).send({ user });
  }
);

userRouter.post('/api/signout', async function (req: Request, res: Response) {
  req.session = null;
  res.send({ currentUserAuthToken: null });
});

userRouter.get(
  '/api/token',
  currentUserAuthToken,
  async function (req: Request, res: Response) {
    res.send({ currentUserAuthToken: req.currentUserAuthToken || null });
  }
);

export { userRouter };
