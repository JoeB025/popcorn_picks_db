const format = require("pg-format");
const db = require("../connection");

const seed = ({ moviesData, reviewsData, castData }) => {
  return db
    .query(`DROP TABLE IF EXISTS reviews;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS casts;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS movies;`);
    })
    .then(() => {
      // Create the movies table first
      return db.query(`
        CREATE TABLE movies (
          movie_id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          likes INTEGER NOT NULL,
          starring_actors TEXT[] NOT NULL,
          director TEXT NOT NULL,
          trailer_url TEXT NOT NULL,
          genre TEXT[] NOT NULL,
          run_time TEXT NOT NULL,
          release_year INTEGER NOT NULL,
          box_office TEXT NOT NULL,
          budget TEXT NOT NULL,
          production_company TEXT NOT NULL,
          img_url TEXT NOT NULL
        )
      `);
    })
    .then(() => {
      // Then create the casts and reviews tables that reference movies
      const castTablePromise = db.query(`
        CREATE TABLE casts (
          cast_id SERIAL PRIMARY KEY,
          movie_id INTEGER REFERENCES movies(movie_id),
          movie_title TEXT NOT NULL,
          actor VARCHAR(255) NOT NULL,
          character TEXT NOT NULL,
          actor_id INTEGER NOT NULL
        )
      `);

      const reviewsTablePromise = db.query(`
        CREATE TABLE reviews (
          review_id SERIAL PRIMARY KEY,
          movie_id INTEGER REFERENCES movies(movie_id),
          author VARCHAR(255) NOT NULL,
          votes INTEGER CHECK (votes >= 0 AND votes <= 100),
          body TEXT NOT NULL
        )
      `);

      return Promise.all([castTablePromise, reviewsTablePromise]);
    })
    .then(() => {
      // Insert data into movies table first
      const insertMoviesQuery = format(
        `
        INSERT INTO movies (
          title, 
          description, 
          likes, 
          starring_actors, 
          director, 
          trailer_url,
          genre, 
          run_time, 
          release_year, 
          box_office, 
          budget,
          production_company,
          img_url
        ) 
        VALUES %L 
        RETURNING *;
        `,
        moviesData.map(
          ({
            title,
            description,
            likes,
            starring_actors,
            director,
            trailer_url,
            genre,
            run_time,
            release_year,
            box_office,
            budget,
            production_company,
            img_url,
          }) => [
            title,
            description,
            likes,
            `{${starring_actors.join(",")}}`,
            director,
            trailer_url,
            `{${genre.join(",")}}`,
            run_time,
            release_year,
            box_office,
            budget,
            production_company,
            img_url,
          ]
        )
      );
      return db.query(insertMoviesQuery);
    })
    .then(() => {
      // After inserting into movies, insert into casts and reviews
      const insertCastQueryStr = format(
        "INSERT INTO casts (movie_title, actor, character, movie_id, actor_id) VALUES %L;",
        castData.map(
          ({ movie_title, actor, character, movie_id, actor_id }) => [
            movie_title, 
            actor, 
            character, 
            movie_id, 
            actor_id,
          ]
        )
      );
      const castsPromise = db.query(insertCastQueryStr);

      const insertReviewsQuery = format(
        `
        INSERT INTO reviews (movie_id, author, votes, body) 
        VALUES %L 
        RETURNING *;
        `,
        reviewsData.map(({ movie_id, author, votes, body }) => [
          movie_id,
          author,
          votes,
          body,
        ])
      );
      const reviewsPromise = db.query(insertReviewsQuery);

      return Promise.all([castsPromise, reviewsPromise]);
    })
    .catch((err) => {
      console.error("Error seeding database:", err);
    });
};

module.exports = seed;
