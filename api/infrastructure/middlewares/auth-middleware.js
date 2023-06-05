const Session = require("../../models/session");
const mongoose = require("mongoose");

module.exports.isLoggedIn = async (req, res, next) => {
  const { session_id } = req.params;
  const isValidSession = await Session.findById(session_id);
  if (!isValidSession) {
    return res.status(401).send("You must be signed in first!");
  }
  next();
};
