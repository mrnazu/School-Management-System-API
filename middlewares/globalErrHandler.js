const globalErrHandler = (err, req, res, next) => {
  //status
  //message
  //stack
  const stack = err.stack;
  const message = err.message;
  const status = err.status ? err.status : "failed";
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

//Not found
const notFoundErr = (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server`);
  next(err);
};

module.exports = { globalErrHandler, notFoundErr };
