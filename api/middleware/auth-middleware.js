const session = require("../models/session");

module.exports.isLoggedIn = async (req, res, next) => {
  const session_id = req.body.session_id;
  const isSessionValid = await session.findById(session_id);
  if (isSessionValid) {
    return res.status(401).send("You must be signed in first!");
  }
  next();
};
