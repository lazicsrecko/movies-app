const express = require("express");
const router = express.Router();
const Movie = require("../models/movies");

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

module.exports = router;
