const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

function authentication(req, res, next) {
  const token = verifyToken(req.headers.access_token);

  User.findByPk(token.id)
    .then((user) => {
      if (user) {
        req.loggedUser = {
          id: token.id,
        };
        return next();
      } else {
        return next({
          name: "InvalidToken",
        });
      }
    })
    .catch((err) => next(err));
}

module.exports = { authentication };
