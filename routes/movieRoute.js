const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const authMiddleware = require("../middlewares/authMiddleware");
const Movie = require("../models/Movie");
const movieRoute = express.Router();

//Create Movies
movieRoute.post(
  "/",
  authMiddleware,
  expressAsyncHandler(async (req, res) => {
    // Grab the user from the req.User
    const userId = req.user._id;

    const movie = await Movie.create({
      movieName: req.body.movieName,
      movieRating: req.body.movieRating,
      movieCast: req.body.movieCast,
      movieGenre: req.body.movieGenre,
      movieReleaseDate: req.body.movieReleaseDate,
      createdBy: userId,
    });

    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(500);
      throw new Error("Movie creating failed");
    }
  })
);

//GET Movies
movieRoute.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const movie = await Movie.find({});

    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(500);
      throw new Error("There are no books");
    }
  })
);

// Update Books
movieRoute.put(
  "/update/:id",
  authMiddleware,
  expressAsyncHandler(async (req, res) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.json(error);
    }
  })
);

// Delete Movies
movieRoute.delete(
  "/:id",
  authMiddleware,
  expressAsyncHandler(async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      res.status(200).send(movie);
    } catch (error) {
      res.json(error);
    }
  })
);

module.exports = movieRoute;
