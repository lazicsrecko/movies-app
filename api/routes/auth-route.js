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
    const response = {
      user,
      session_id: req.sessionID,
    };
    if (err) return next(err);
    res.status(200).send(response);
  });
});

// Login
router.post("/login", passport.authenticate("local"), (req, res) => {
  const response = {
    user: req.user,
    session_id: req.sessionID,
  };
  res.status(200).send(response);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send("Hope to see you soon!");
});

module.exports = router;
