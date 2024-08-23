const { selectCasts } = require("../models/casts.model")

exports.getCasts = ( req, res, next) => {
  selectCasts()
  .then((castData) => {
      res.status(200).send({castData})
    })
  .catch((err) => {
      next(err)
    })
} 