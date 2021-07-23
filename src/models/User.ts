import mongoose from 'mongoose';
import { Password } from '../services/Password';
interface UserAttrs {
  email: string;
  username: string;
  password: string;
  age?: number;
  reputation?: number;
  country: string;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    default: 'user',
  },
  reputation: {
    type: Number,
    default: 5,
  },
  age: {
    type: Number,
    required: true,
  },
});

const UserModel = mongoose.model('User', UserSchema);

class User extends UserModel {
  constructor(userAttrs: UserAttrs) {
    super(userAttrs);
  }
}

export { User };
