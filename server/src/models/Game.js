const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    requried: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = { Game };
