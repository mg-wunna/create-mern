import {} from 'dotenv/config';
import mongoose from 'mongoose';

// ✔ connect with mongo database
const { MONGO_URL } = process.env;
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(_ => {
    console.log('Mongo database connected.');
  })
  .catch(error => {
    console.log('Mongo database connection error.');
    console.log(error.message);
  });
