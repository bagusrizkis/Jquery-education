const { Movie } = require("../models");
const axios = require("axios").default;

class MovieController {
  static getPopular(req, res, next) {
    // get 3rd party api
    // Send a POST request
    axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular",
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    })
      .then(({ data }) => {
        res.status(200).json({
          success: true,
          data: data.results,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static findAll(req, res, next) {
    const id = req.loggedUser.id;
    Movie.findAll({
      where: {
        UserId: id,
      },
    })
      .then((data) => {
        res.status(200).json({
          success: true,
          data: data,
        });
      })
      .catch((err) => next(err));
  }

  static findOne(req, res, next) {
    const id = req.params.id;
    Movie.findByPk(id)
      .then((data) => {
        if (!data) next({ name: "NotFound" });
        res.status(200).json({
          success: true,
          data: {
            id: data.id,
            title: data.title,
            poster: data.poster,
            genre: data.genre,
            year: data.year,
          },
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
        res.status(201).json({
          success: true,
          data: data,
        });
      })
      .catch((err) => next(err));
  }

  static edit(req, res, next) {
    const { title, poster, genre, year } = req.body;

    Movie.update(
      {
        title,
        poster,
        genre,
        year,
      },
      {
        where: { id: req.params.id },
        returning: true,
      }
    )
      .then((data) => {
        res.status(201).json({
          success: true,
          data: data[1][0],
        });
      })
      .catch((err) => next(err));
  }

  static delete(req, res, next) {
    let dataMovie = {};
    Movie.findByPk(req.params.id)
      .then((movie) => {
        dataMovie = movie;
        console.log("masuk");
        return movie.destroy();
      })
      .then(() => {
        res.status(201).json({
          success: true,
          data: {
            title: dataMovie.title,
          },
        });
      })
      .catch((err) => next(err));
  }
}

module.exports = MovieController;
