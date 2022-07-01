import {} from 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

// ✔ connect with mongo database
const { MONGO_URL, PORT } = process.env;
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(_ => {
    console.log('Mongo database connected.');

    // ✔ create express server and middleware
    const server = express();
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(cors());

    // ✔ listen server at the port
    server.listen(PORT, console.log(`Server is listening at the port ${PORT}!`));
  })
  .catch(error => {
    console.log('Mongo database connection error.');
    console.log(error.message);
  });
