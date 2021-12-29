const express = require("express");
const router = express.Router();
const Movie = require("../models/movies");


// Get list of all movies from database
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).send(movies);
  } catch (err) {
    res.status(500).json({
      message: "Some error occured",
      err,
    });
  }
});

// Get movie by id
router.get("/:id", async(req, res) => {
  const movieId = req.params.id;
  const movie = await Movie.findById(movieId);
  try {
    if(!movie){
      res.status(400).send('No such movie in database!')
    }
    res.status(200).send(movie);
  } catch (err) {
    res.status(500).json({
      message: 'Some  error occured',
      err
    })
  }
})

module.exports = router;
