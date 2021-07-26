const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body;
    User.create({ email, password })
      .then((data) => {
        let payload = { email: data.email, id: data.id };
        const access_token = signToken(payload);
        res.status(201).json({
          success: true,
          access_token,
        });
      })
      .catch((err) => next(err));
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (user) {
          if (comparePassword(password, user.password)) {
            const payload = { email: user.email, id: user.id };
            const access_token = signToken(payload);
            res.status(201).json({
              success: true,
              access_token,
            });
          } else {
            next({ name: "BadRequest", msg: "Invalid email/password" });
          }
        } else {
          next({ name: "BadRequest", msg: "Invalid email/password" });
        }
      })
      .catch((err) => next(err));
  }
}

module.exports = UserController;
