const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  movie_id: { type: Schema.Types.ObjectId, ref: "Movie" },
  rating: { type: Number, required: true },
  isActive: Boolean,
  date: Date,
});

module.exports = mongoose.model("Rating", ratingSchema);
