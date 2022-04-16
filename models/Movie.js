const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
      unique: true,
    },
    movieRating: {
      type: Number,
      required: true,
    },
    movieCast: {
      type: Array,
      required: true,
    },
    movieGenre: {
      type: String,
      required: true,
    },
    movieReleaseDate: {
      type: Date,
      required: true,
      min: "2000-01-01",
      max: "2022-04-16",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
