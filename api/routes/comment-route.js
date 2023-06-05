const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../infrastructure/middlewares/auth-middleware");
const Comment = require("../models/comments");
const Movie = require("../models/movies");

// Comment movie
router.post("/:session_id", isLoggedIn, async (req, res) => {
  const { movie_id, user_id, text, date } = req.body;
  try {
    const newComment = await Comment.create({
      movie_id,
      user_id,
      text,
      date,
    });
    const movie = await Movie.findById(movie_id);
    movie.comments.push(newComment._id);
    await movie.save();
    res.status(200).send(newComment);
  } catch (err) {
    res.status(500).json({
      message: "Some  error occured",
      err,
    });
  }
});

module.exports = router;
