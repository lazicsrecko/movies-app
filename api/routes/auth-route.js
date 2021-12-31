const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/users");

// Register
router.post("/register", async (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;
  const newUser = new User({
    email,
    username,
    firstName,
    lastName,
  });
  const user = await User.register(newUser, password);
  req.login(user, (err) => {
    if (err) return next(err);
    res.status(200).send(req.sessionID);
  });
});

// Login
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send(req.sessionID);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send("Hope to see you soon!");
});

module.exports = router;
