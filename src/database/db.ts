import mongoose from 'mongoose';
import { DatabaseConnectionError } from '../errors/database-connection-error';

//options to avoid deprecated warnings of mongoose
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  findAndModify: false,
};

const mongodbURI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/dacommerce';

const db = mongoose.connect(mongodbURI, mongooseOptions);

//loggin stuff
const dbConnection = mongoose.connection;
dbConnection.on('error', function () {
  throw new DatabaseConnectionError();
});
dbConnection.once('open', function () {
  console.log('DB up and running');
});

export { db };
