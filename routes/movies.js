const express = require("express");
const router = express.Router();

const MovieModel = require("../models/Movie");
const ActorModel = require("../models/Actor");

router.get("/", async (reguest, response) => {
  const movies = await MovieModel.find();
  response.send(movies);
});

router.get("/:id", async (request, response) => {
  const movieId = request.params.id;
  const movie = await MovieModel.findById(movieId);

  if (!movie) return response.status(404).send(`yok öyle bir film ${movieId}`);
  response.send(movie);
});

// filme ait actorleri çeker
router.get("/:id/actors", async (request, response) => {
  const movieId = request.params.id;
  const movie = await MovieModel.findById(movieId).populate("actors");

  if (!movie)
    return response.status(404).send(`yokkkk öyle bir film ${movieId}`);
  response.send(movie.actors);
});

router.post("/:movieId/actors/:actorId", async (request, response) => {
  const movieId = request.params.movieId;
  const actorId = request.params.actorId;

  const movie = await MovieModel.findById(movieId).populate("actor");

  if (!movie) return response.status(404).send(`yok öyle bir film ${movieId}`);

  const actor = await ActorModel.findById(actorId);

  if (!actor) return response.send(`yok öyle bir actor ${actorId}`);

  const isActorExist = movie.actors.find(actor => actorId === actor.id);
  if (isActorExist)
    return response
      .status(400)
      .send(
        `actor with is ${actorId} alresdy exist in the movie with id${movieId}`
      );

  movie.actors.push(actor);
  await movie.save();
  response.send(movie);
});

router.post("/", async (request, response) => {
  const movie = new MovieModel(request.body);
  const saved = await movie.save();
  response.send(saved);
});

router.put("/:id", async (request, response) => {
  const movieId = request.params.id;
  const updates = request.body;
  const movie = await MovieModel.findByIdAndUpdate(movieId, updates, {
    new: true
  });
  if (!movie) return response.status(404).send(`yok öylebir film ${movieId}`);
  response.send(movie);
});

router.delete("/:id", async (request, response) => {
  const movieId = request.params.id;
  const movie = await MovieModel.findByIdAndRemove(movieId);
  if (!movie) return response.status(404).send(`yok öylebir film ${movieId}`);
  response.send(movie);
});

module.exports = router;
