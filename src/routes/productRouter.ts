import express, { Request, Response } from 'express';
import { currentUserAuthToken } from '../middleware/currentAuth';
import { requireAuth } from '../middleware/require-auth';
import { validateRequest } from '../middleware/validate-request';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Product } from '../models/Product';
const productRouter = express.Router();

productRouter.get(
  '/api/product/all',
  async function (req: Request, res: Response) {
    const products = await Product.find({ stock: { $gte: 0 } });
    res.status(200).send(products);
  }
);
productRouter.get(
  '/api/product/:id',
  async function (req: Request, res: Response) {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.send(product);
  }
);

productRouter.post(
  '/api/product',
  [
    body('price').not().isEmpty(),
    body('name').not().isEmpty(),
    body('stock').not().isEmpty(),
  ],
  validateRequest,
  currentUserAuthToken,
  requireAuth,
  async function (req: Request, res: Response) {
    //@ts-ignore
    const { id } = jwt.verify(req.session.jwt, process.env.JWT_KEY);
    const product = new Product({
      sellerID: id,
      ...req.body,
    });
    await product.save();
    res.status(201).send(product);
  }
);
productRouter.put(
  '/api/product/:id',
  currentUserAuthToken,
  requireAuth,
  async function (req: Request, res: Response) {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate({ _id: id }, req.body);
    res.status(product);
  }
);
productRouter.delete(
  '/api/product/:id',
  currentUserAuthToken,
  requireAuth,
  async function (req: Request, res: Response) {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete({ _id: id });
    res.status(product);
  }
);

export { productRouter };
