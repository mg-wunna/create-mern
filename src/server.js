import {} from 'dotenv/config';
import {} from './configs/custom-console.config.js';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

import serverStatusesRouter from './routers/server-stauses.router.js';
import systemsRouter from './routers/systems.router.js';

// ✔ connect with mongo database
const { MONGO_URL, PORT } = process.env;
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(_ => {
    console.Success('Mongo database connected.');

    // ✔ create express server and middleware
    const server = express();
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(cors());

    // ✔ connect with router that do not need authorization
    server.use('/api/server-statuses', serverStatusesRouter);
    server.use('/api/systems', systemsRouter);

    // ✔ listen server at the port
    server.listen(PORT, console.Success(`Server is listening at the port ${PORT}!`));
  })
  .catch(error => {
    console.Error('Mongo database connection unknown error.', error.message, 'Report to admin.');
  });
