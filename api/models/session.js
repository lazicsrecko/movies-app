const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  _id: String,
  expires: Date,
  session: Object,
});

module.exports = mongoose.model("Session", sessionSchema);
