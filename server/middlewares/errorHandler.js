function errorHandler(err, req, res, next) {
  console.log(err);

  let statusCode;
  let errMessage;

  switch (err.name) {
    case "SequelizeValidationError":
      statusCode = 400;
      errMessage = err.errors.map((e) => e.message);
      break;
    case "JsonWebTokenError":
      statusCode = 401;
      errMessage = [err.message];
      break;
    case "InvalidToken":
      statusCode = 401;
      errMessage = ["Invalid Token"];
    case "Unauthorized":
      statusCode = 401;
      errMessage = ["Not authorized"];
      break;
    case "NotFound":
      statusCode = 404;
      errMessage = ["Not Found"];
      break;
    case "NotLoginYet":
      statusCode = 400;
      errMessage = [err.msg];
      break;
    case "BadRequest":
      statusCode = 400;
      errMessage = [err.msg];
      break;
    default:
      statusCode = 500;
      errMessage = ["InternalServerError"];
      break;
  }

  return res.status(statusCode).json({
    success: false,
    message: errMessage,
    devError: err,
  });
}

module.exports = errorHandler;
