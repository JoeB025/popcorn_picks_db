const db = require('../db/connection')

exports.selectCasts = () => {
  return db.query('SELECT * FROM casts')
   .then((res) => {
    return res.rows
   })
}