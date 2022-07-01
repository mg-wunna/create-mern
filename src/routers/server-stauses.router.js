import { Router } from 'express';
import mongoose from 'mongoose';
import serverStatusesModel from './../models/server-statuses.model.js';

const serverStatusesRouter = Router();

// ✔ create read all server status api
serverStatusesRouter.get('/', async (req, res) => {
  try {
    // ✔ get page , limit and find from request query
    let page = parseInt(req.query.page, 10) || 0;
    let limit = parseInt(req.query.limit, 10) || 50;
    let find = req.query.find ? { 'meta.status': req.query.find } : {};
    let skip = (page - 1) * limit;

    // ✔ get server statuses data from database by find and page
    let serverStatuses = await serverStatusesModel.find(find).skip(skip).limit(limit);
    if (!serverStatuses) return console.Error('Read all server statuses api error.', 'Page limit reach.', 'Change page to lower and try again.');
    return console.Success('Read all server statuses api success.', serverStatuses, res, 200);
  } catch (error) {
    return console.Fail('Read all server statuses api unknown error.', error.message, 'Report to admin.');
  }
});

// ✔ create delete all server status api
serverStatusesRouter.delete('/', async (req, res) => {
  try {
    // ✔ delete all server status data and response
    await serverStatusesModel.deleteMany();
    return console.Success('Delete all server statuses api success.', undefined, res, 200);
  } catch (error) {
    return console.Fail('Delete all server statuses api unknown error.', error.message, 'Report to admin.');
  }
});

// ✔ create delete server status by id api
serverStatusesRouter.delete('/:id', async (req, res) => {
  try {
    // ✔ get id from request and validate
    let id = req.params.id;
    if (!mongoose.isValidObjectId(id)) return console.Error('Delete server statuses by id api error.', 'Id is invalid.', 'Try again with right id.', res);

    // ✔ delete server statuses in database by id and response data
    let result = await serverStatusesModel.findByIdAndDelete(id);
    if (!result) return console.Error('Delete server statuses by id api error.', 'Data not found by id.', 'Try again with right id.', res, 404);
    return console.Success('Delete server statuses by id api success.', undefined, res);
  } catch (error) {
    return console.Fail('Delete server statuses by id api unknown error.', error.message, 'Report to admin.');
  }
});

export default serverStatusesRouter;
