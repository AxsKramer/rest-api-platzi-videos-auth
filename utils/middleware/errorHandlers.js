const boom = require('@hapi/boom');
const config = require('../../config');

function withErrorStack(error, stack){
  if(config.dev) return {...error, stack};

  return error;
}

//imprime los errores
function logErrors(error, req, res, next){
  console.log(error);
  next(error);

}

function wrapError(error, req, res, next){
  if(!error.isBoom) return next(boom.badImplementation(error));

  next(error);
}

//Manejador de errores
function errorHandler(error, req, res, next) {
  const { output: {statusCode, payload}} = error;
  res.status(statusCode);
  res.json(withErrorStack(payload, error.stack));
}

module.exports = {
  logErrors,
  wrapError,
  errorHandler
}