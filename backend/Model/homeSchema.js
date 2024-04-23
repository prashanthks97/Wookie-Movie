const mongoose = require("mongoose");

// Define the Movie schema
const movieSchema = new mongoose.Schema({
  backdrop: {
    type: String,
  },
  cast: [String],
  classification: {
    type: String,
  },
  director: mongoose.Schema.Types.Mixed,
  genres: [String],
  id: {
    type: String,
  },
  imdb_rating: {
    type: Number,
  },
  length: {
    type: String,
  },
  overview: {
    type: String,
  },
  poster: {
    type: String,
  },
  released_on: {
    type: String,
  },
  slug: {
    type: String,
  },
  title: {
    type: String,
  },
});

movieSchema.index({ "$**": "text" });

const Movie = mongoose.model("movies", movieSchema);

module.exports = Movie;
