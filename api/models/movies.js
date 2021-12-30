const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  poster: { type: String, required: true },
  title: { type: String, required: true },
  plot: { type: String, required: true },
  year: { type: Number, required: true },
  cast: { type: Array, required: true },
  directors: Array,
  rated: String,
  rating: Number,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Movie", moviesSchema);
