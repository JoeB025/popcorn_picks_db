const { selectAllMovies, selectMoviesById } = require("../models/movies.model")


exports.getAllMovies = (req, res, next) => {

  selectAllMovies().then((moviesData) => {
    res.status(200).send({moviesData})
  }).catch((err) => {
    next(err)
  })
}; 




exports.getMoviesById = (req, res, next) => {
  const { movie_id } = req.params;

  selectMoviesById(movie_id)
    .then((moviesData) => {
      res.status(200).send({ moviesData });
    })
    .catch((err) => {
      next(err);
    });
};



