const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");


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
  const { body } = req;
  console.log(body);
//   try {
//     if(!movie){
//       res.status(400).send('No such movie in database!')
//     }
//     res.status(200).send(movie);
//   } catch (err) {
//     res.status(500).json({
//       message: 'Some  error occured',
//       err
//     })
//   }
})

module.exports = router;
