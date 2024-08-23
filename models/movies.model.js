const db = require('../db/connection')

exports.selectAllMovies = () => {
  return db.query(`SELECT * FROM movies`)
   .then((res) => {
    return res.rows
   })
}


exports.selectMoviesById = (movie_id) => {
  let query = `SELECT * FROM movies WHERE movie_id = $1`;
  return db.query(query, [movie_id])
  .then((res) => {
    if (res.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: 'Movie not found',
      })
  }
  return res.rows[0]
})
}

