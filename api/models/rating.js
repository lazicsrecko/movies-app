const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  name: String,
  movie_id: { type: Schema.Types.ObjectId, ref: "Movie" },
  rating: { type: Number, required: true },
  date: Date,
});

module.exports = mongoose.model("Rating", ratingSchema);
