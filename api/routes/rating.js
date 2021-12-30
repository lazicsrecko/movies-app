const express = require("express");
const router = express.Router();
const Rating = require("../models/rating");
const Movie = require("../models/movies");

// Get list of all comments from database
// router.get("/", async (req, res) => {
//   try {
//     const movies = await Movie.find();
//     res.status(200).send(movies);
//   } catch (err) {
//     res.status(500).json({
//       message: "Some error occured",
//       err,
//     });
//   }
// });

// Rate a movie
router.post("/", async (req, res) => {
  const { movie_id, user_id, rating, date } = req.body;
  try {
    const newRating = await Rating.create({
      movie_id,
      user_id,
      rating,
      date,
    });
    console.log(rating);
    const ratingsByMovieId = await Rating.find({ movie_id: movie_id });
    const movieRating =
      ratingsByMovieId.reduce((prevValue, crntValue) => prevValue + crntValue) /
      ratingsByMovieId.length;
    const movie = await Movie.findById(movie_id);
    movie.rating = movieRating;
    await movie.save();
    console.log(movie.rating);
    res.status(200).send(movieRating);
  } catch (err) {
    res.status(500).json({
      message: "Some  error occured",
      err,
    });
  }
});

module.exports = router;
