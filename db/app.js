const express = require('express');
const app = express();
const { getAllData } = require("../controllers/api.controller");
const { getAllMovies, getMoviesById } = require("../controllers/movies.controller");
const { getCasts } = require("../controllers/casts.controller");

const cors = require("cors");

// app.use(cors());
//app.use(express.json());


app.get("/api", getAllData); // gets all the data

app.get("/api/movies", getAllMovies) // get all movies 

app.get("/api/movies/:movie_id", getMoviesById); // get movies by Id

app.get("/api/casts", getCasts); // get all casts



app.all("*", (req, res) => {
  res.status(404).send({ Status: 404, msg: "endpoint not found" });
}); // rejects all promises where an endpoint is not found


module.exports = app 