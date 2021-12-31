const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth-middleware");
const Rating = require("../models/rating");
const Movie = require("../models/movies");

// Rate a movie
router.post("/", isLoggedIn, async (req, res) => {
  const { movie_id, name, rating, date } = req.body;
  try {
    const newRating = await Rating.create({
      movie_id,
      name,
      rating,
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
