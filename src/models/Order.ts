import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface OrderAttrs {
  buyerID: string;
  sellerID: string;
  productID: string;
  fullFilled?: boolean;
  amount: number;
}

const OrderSchema = new mongoose.Schema({
  buyerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  sellerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  fullFilled: {
    type: Boolean,
  },
  amount: {
    type: Number,
    required: true,
  },
});
//all of this is for normalize the field ID bc maybe i will add a sql database to this project
OrderSchema.set('toJSON', {
  transform(doc: any, ret: any) {
    ret.id = ret._id;
    delete ret.__v;
    delete ret._id;
  },
});
//this is for avoid concurrency issues using optimistic concurrency control
OrderSchema.set('versionKey', 'version');
OrderSchema.plugin(updateIfCurrentPlugin);

const OrderModel = mongoose.model('Order', OrderSchema);

class Order extends OrderModel {
  constructor(orderAttrs: OrderAttrs) {
    super(orderAttrs);
  }
}

export { Order };
