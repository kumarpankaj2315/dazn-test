const mongoose = require("mongoose");

const lobbySchema = mongoose.Schema({
  title: {
    require: true,
    type: String,
  },
  genre: {
    require: true,
    type: String,
  },
  rating: {
    require: true,
    type: Number,
  },
  streaming_link: {
    require: true,
    type: String,
  },
});

module.exports = mongoose.model("Lobby", lobbySchema);
