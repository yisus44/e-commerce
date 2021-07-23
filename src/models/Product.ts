import mongoose from 'mongoose';

interface ProductAttrs {
  name: string;
  price: number;
  currency?: string;
  stock: number;
  sellerId: string;
  category?: string;
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: false,
    default: 'General',
  },
  currency: {
    type: String,
    required: false,
    default: 'USD',
  },
  stock: {
    type: Number,
    required: true,
  },
});

const ProductModel = mongoose.model('Product', ProductSchema);

class Product extends ProductModel {
  constructor(productAttrs: ProductAttrs) {
    super(productAttrs);
  }
}

export { Product };
