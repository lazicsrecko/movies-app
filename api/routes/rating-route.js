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
  const { movie_id, name, rating, date } = req.body;
  try {
    const newRating = await Rating.create({
      movie_id,
      name,
      rating,
      date,
    });
    console.log(newRating);
    const ratingsByMovieId = await Rating.find({ movie_id: movie_id });
    const sumOfMovieRating = ratingsByMovieId.reduce((prevValue, crntValue) => prevValue + crntValue.rating, 0);
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
