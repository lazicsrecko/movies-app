const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth-middleware");
const Rating = require("../models/rating");
const Movie = require("../models/movies");

// Rating by user and movie id
router.get("/:movie_id/:user_id/:session_id", isLoggedIn, async (req, res) => {
  const { user_id, movie_id } = req.params;
  try {
    const rating = await Rating.find({
      movie_id: movie_id,
      user_id: user_id,
      isActive: true,
    });
    res.status(200).send(rating[0]);
  } catch (err) {
    res.status(500).json({
      message: "Some  error occured",
      err,
    });
  }
});

// Rate a movie
router.post("/:session_id", isLoggedIn, async (req, res) => {
  const { movie_id, user_id, rating, date } = req.body;
  try {
    const oldRating = await Rating.find({
      movie_id: movie_id,
      user_id: user_id,
      isActive: true,
    });
    if (oldRating.length !== 0) {
      oldRating[0].isActive = false;
      await oldRating[0].save();
    }
    const newRating = await Rating.create({
      movie_id,
      user_id,
      rating,
      isActive: true,
      date,
    });
    const ratingsByMovieId = await Rating.find({ movie_id: movie_id });
    const sumOfMovieRating = ratingsByMovieId.reduce(
      (prevValue, crntValue) => prevValue + crntValue.rating,
      0
    );
    const movieRating = sumOfMovieRating / ratingsByMovieId.length;
    const movie = await Movie.findById(movie_id);
    movie.rating = movieRating;
    await movie.save();
    res.status(200).send(newRating);
  } catch (err) {
    res.status(500).json({
      message: "Some  error occured",
      err,
    });
  }
});

module.exports = router;
