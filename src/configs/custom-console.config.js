import serverStatusesModel from '../models/server-statuses.model.js';

const { NODE_ENV } = process.env;

// ✔ create custom console function
const customConsole = (type, message, detail, solution, data, res, status) => {
  // ✔ show success or error log in console when development state
  if (NODE_ENV === 'development') {
    if (type === 'success') console.log(`✔ ${message}`);
    else console.log(`X ${message}\n! ${typeof detail === 'object' ? JSON.stringify(detail) : `${detail.charAt(0).toUpperCase()}${detail.slice(1)}`} \n? ${solution}`);
  }

  // ✔ create server status data
  let serverStatus = new serverStatusesModel({ meta: { status: type, statusCode: status }, message, detail, solution });

  // ✔ save server status in mongo database
  serverStatus.save().catch(error => console.log(error.message));

  // ✔ response data for api
  serverStatus = JSON.parse(JSON.stringify(serverStatus));
  let _id = serverStatus._id;
  delete serverStatus._id;
  if (res) res.status(status).send({ _id, ...serverStatus, data });
};

// ✔ add custom console in console object
console.Success = (message, data, res, status = 200) => customConsole('success', message, undefined, undefined, data, res, status);
console.Error = (message, detail, solution, res, status = 400) => customConsole('error', message, detail, solution, undefined, res, status);
console.Fail = (message, detail, solution, res, status = 500) => customConsole('fail', message, detail, solution, undefined, res, status);
