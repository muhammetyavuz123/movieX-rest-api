const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
  name: String,
  surname: String,
  birtdate: Date,
  hasOscar: { type: Boolean, default: false },
  gender: { type: String, enum: ["Female", "Male"] }
});

module.exports = mongoose.model("Actor", actorSchema);
