function errorHandler(err, req, res, next) {
  console.log(err);
  switch (err.name) {
    case 'SequelizeValidationError':
      const errors = err.errors.map((e) => ({
        name: 'BadRequest',
        errors: e.message,
      }));
      return res.status(400).json({
        errors,
      });
    case 'JsonWebTokenError':
      return res.status(401).json({
        errors: [{ msg: err.message }],
      });
    case 'Unauthorized':
      return res.status(401).json({
        error: err.msg,
      });
    case 'NotFound':
      return res.status(404).json(err.errors);
    case 'NotLoginYet':
      return res.status(400).json({
        error: err.msg,
      });
    case 'BadRequest':
      return res.status(400).json({
        error: err.msg,
      });
    default:
      res.status(500).json({
        name: 'InternalServerError',
        error: err.errors,
      });
      break;
  }
}

module.exports = errorHandler;
