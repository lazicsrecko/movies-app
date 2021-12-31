const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  expires: Date,
  session: Object,
});

module.exports = mongoose.model("Session", sessionSchema);
