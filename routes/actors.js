const express = require("express");
const router = express.Router();

const actorModel = require("../models/Actor");

router.get("/", async (reguest, response) => {
  const actors = await actorModel.find();
  response.send(actors);
});

router.get("/:id", async (request, response) => {
  const actorId = reguest.params.id;
  const actor = await actorModel.findById(actorId);

  if (!actor) return response.send(`yok öyle bir actor ${actorId}`);
  response.send(actor);
});

router.post("/", async (request, response) => {
  const actor = new actorModel(request.body);
  const saved = await actor.save();
  response.send(saved);
});

router.put("/:id", async (request, response) => {
  const actorId = request.params.id;
  const updates = request.body;
  const actor = await actorModel.findByIdAndUpdate(actorId, updates, {
    new: true
  });
  if (!actor) return response.send(`yok öyle bir actor ${actorId}`);
  response.send(actor);
});

router.delete("/:id", async (request, response) => {
  const actorId = request.params.id;
  const actor = await actorModel.findByIdAndRemove(actorId);
  if (!actor) return response.status(404).send(`yok öylebir actor ${actorId}`);
  response.send(actor);
});

module.exports = router;
