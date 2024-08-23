const request = require("supertest");
const app = require("../db/app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const endpoints = require("../endpoints.json");

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe("app", () => {
  test("GET/ api should return a description of all other endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(typeof res).toBe("object");
        expect(res.body.endpoints).toEqual(endpoints);
        for (const key in res.body.endpoints) {
          expect(typeof res.body.endpoints[key].description).toBe("string");
          if (key === "GET /api") {
            expect(res.body.endpoints[key].description).toBe(
              "serves up a json representation of all the available endpoints of the api"
            );
          }
          if (key !== "GET /api") {
            expect(Array.isArray(res.body.endpoints[key].queries)).toBe(true);
            expect(typeof res.body.endpoints[key].exampleResponse).toBe(
              "object"
            );
          }
        }
      });
  });
});

describe("app", () => {
  describe("/api/movies", () => {
    test("GET /movies should return a list of all movies and a status code of 200", () => {
      return request(app)
        .get("/api/movies")
        .expect(200)
        .then((res) => {
          expect(res.body.moviesData.length).toBe(19);
          res.body.moviesData.forEach((film) => {
            expect(typeof film).toBe("object");
            expect(typeof film.movie_id).toBe("number");
            expect(typeof film.title).toBe("string");
            expect(typeof film.description).toBe("string");
            expect(typeof film.likes).toBe("number");
            expect(Array.isArray(film.starring_actors)).toBe(true);
            expect(typeof film.director).toBe("string");
            expect(typeof film.trailer_url).toBe("string");
            expect(Array.isArray(film.genre)).toBe(true);
            expect(typeof film.run_time).toBe("string");
            expect(typeof film.release_year).toBe("number");
            expect(typeof film.box_office).toBe("string");
            expect(typeof film.budget).toBe("string");
            expect(typeof film.production_company).toBe("string");
            expect(typeof film.img_url).toBe("string");
          });
        });
    });
    test(`GET / request should return error status code 404 with a message 'endpoint not found' for invalid endpoint requests.`, () => {
      return request(app)
        .get("/api/notMovies")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("endpoint not found");
        });
    });
  });
});

describe("app", () => {
  describe("/api/movies:movie_id", () => {
    test("GET /movies should return a single requested movie and a status code of 200", () => {
      return request(app)
        .get("/api/movies/5")
        .expect(200)
        .then((res) => {
          expect(res.body.moviesData.title).toBe(
            "The Lord of the Rings: The Fellowship of the Ring"
          );
          expect(res.body.moviesData.description).toBe(
            "A young hobbit, Frodo, is tasked with destroying an ancient and powerful ring to save Middle-earth from the dark lord Sauron."
          );
          expect(res.body.moviesData.likes).toBe(0);
          expect(res.body.moviesData.starring_actors[0]).toBe("Elijah Wood");
          expect(res.body.moviesData.starring_actors[1]).toBe("Ian McKellen");
          expect(res.body.moviesData.starring_actors[2]).toBe(
            "Viggo Mortensen"
          );
          expect(res.body.moviesData.starring_actors[3]).toBe("Sean Bean");
          expect(res.body.moviesData.starring_actors[4]).toBe("Orlando Bloom");
          expect(res.body.moviesData.starring_actors[5]).toBe(
            "John Rhys-Davies"
          );
          expect(res.body.moviesData.starring_actors[6]).toBe("Sean Astin");
          expect(res.body.moviesData.starring_actors[7]).toBe(
            "Dominic Monaghan"
          );
          expect(res.body.moviesData.starring_actors[8]).toBe("Billy Boyd");
          expect(res.body.moviesData.starring_actors[9]).toBe("Andy Serkis");
          expect(res.body.moviesData.starring_actors[10]).toBe(
            "Cate Blanchett"
          );
          expect(res.body.moviesData.director).toBe("Peter Jackson");
          expect(res.body.moviesData.trailer_url).toBe(
            "https://www.youtube.com/watch?v=aStYWD25fAQ"
          );
          expect(res.body.moviesData.genre[0]).toBe("Adventure");
          expect(res.body.moviesData.genre[1]).toBe("Drama");
          expect(res.body.moviesData.genre[2]).toBe("Fantasy");
          expect(res.body.moviesData.run_time).toBe("178 min");
          expect(res.body.moviesData.release_year).toBe(2001);
          expect(res.body.moviesData.box_office).toBe("$897.7 million");
          expect(res.body.moviesData.budget).toBe("$93 million");
          expect(res.body.moviesData.production_company).toBe(
            "New Line Cinema"
          );
          expect(res.body.moviesData.img_url).toBe("Add Img Here");
        });
    });
  });
});












describe("app", () => {
  describe("/api/casts", () => {
    test("GET /casts should return a list of all casts and a status code of 200", () => {
      return request(app)
        .get("/api/casts")
        .expect(200)
        .then((res) => {
          expect(res.body.castData.length).toBe(282);
          res.body.castData.forEach((film) => {
            expect(typeof film).toBe("object");
            expect(typeof film.movie_id).toBe("number");
            expect(typeof film.movie_title).toBe("string");
            expect(typeof film.actor).toBe("string");
            expect(typeof film.character).toBe("string");
            expect(typeof film.actor_id).toBe("number");
          });
        });
    });
  });
});
