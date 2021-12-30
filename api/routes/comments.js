const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");
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

// Comment movie
router.post("/", async (req, res) => {
  const { movie_id, name, text, date } = req.body;
  try {
    const newComment = await Comment.create({
      movie_id,
      name,
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
