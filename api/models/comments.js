const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  name: String,
  movie_id: { type: Schema.Types.ObjectId, ref: "Movie" },
  text: String,
  date: Date,
});

module.exports = mongoose.model("Comment", commentsSchema);
