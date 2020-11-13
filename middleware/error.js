const ErrorResponse = require('../utils/errorResponse');

//midleware se ucitava u linearnom redu tako da ako ga zelimo koristiti u controlers/bootcamp, moramo ga u server.js staviti nakon sto ucitamo te rute iz conntrollers/bootcamp
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //log to console for developers
  console.log(err);

  //Mongoose bad objectID:
  if (err.name === 'CastError') {
    const message = `Resurce not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //mongoose duplicate key:
  if (err.code === 11000) {
    const message = 'duplicsate field value entered';
    error = new ErrorResponse(message, 400);
  }

  //Mongoose validation error:
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.status || 500)
    .json({ success: false, error: error.message || 'server error' });
};

module.exports = errorHandler;
