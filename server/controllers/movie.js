const { Movie } = require("../models");

class MovieController {
  static findAll(req, res, next) {
    const id = req.loggedUser.id;
    Movie.findAll({
      where: {
        UserId: id,
      },
    })
      .then((data) => {
        res.status(200).json({
          data,
        });
      })
      .catch((err) => next(err));
  }

  static findOne(req, res, next) {
    const id = req.params.id;
    Movie.findByPk(id)
      .then((data) => {
        res.status(200).json({
          id: data.id,
          title: data.title,
          poster: data.poster,
          genre: data.genre,
          year: data.year,
        });
      })
      .catch((err) => next(err));
  }

  static create(req, res, next) {
    const { title, poster, genre, year } = req.body;
    const { id } = req.loggedUser;

    Movie.create({
      title,
      poster,
      genre,
      year,
      UserId: id,
    })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => next(err));
  }
}

module.exports = MovieController;
