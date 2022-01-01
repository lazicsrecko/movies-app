const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn } = require("../middleware/auth-middleware");
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
      user: {
        user_id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      _id: req.user._id,
      session_id: req.sessionID,
    };
    if (err) return next(err);
    res.status(200).send(response);
  });
});

// Login
router.post("/login", passport.authenticate("local"), (req, res) => {
  const response = {
    user: {
      user_id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    },
    _id: req.user._id,
    session_id: req.sessionID,
  };
  res.status(200).send(response);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send("Hope to see you soon!");
});

router.get("/user/:id/:session_id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const response = {
      user: {
        user_id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({
      message: "Some error occured!",
      err,
    });
  }
});

module.exports = router;
