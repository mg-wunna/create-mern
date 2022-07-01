import mongoose from 'mongoose';

// ✔ create server statuses schema and model
const serverStatusesModel = mongoose.model(
  'server-statuses',
  new mongoose.Schema(
    {
      meta: {
        status: String,
        statusCode: String
      },
      message: String,
      detail: String,
      solution: String
    },
    {
      versionKey: false
    }
  )
);

export default serverStatusesModel;
