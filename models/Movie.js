const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: String,
  description: String,
  genre: [String],
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
  isNominated: { type: Boolean, default: false },
  released: Number
});
module.exports = mongoose.model("movie", movieSchema);
