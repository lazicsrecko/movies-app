const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const movieRouter = require("./routes/movie-route");
const commentRouter = require("./routes/comment-route");
const ratingRouter = require("./routes/rating-route");
const authRouter = require("./routes/auth-route");
const User = require("./models/users");

const PORT = process.env.PORT || 3001;

// MongoDB connection string
mongoose
  .connect(
    "mongodb+srv://admin:v9jxFgbJSUK3H5G@cluster0.znu9f.mongodb.net/moviesDB?retryWrites=true&w=majority"
  )
  .then(console.log("Database connected!"))
  .catch((err) => console.log(err));

const sessionConfig = {
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  store: MongoStore.create({
    mongoUrl:
      "mongodb+srv://admin:v9jxFgbJSUK3H5G@cluster0.znu9f.mongodb.net/moviesDB?retryWrites=true&w=majority",
  }),
};

// Middleware
app.use(logger("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(sessionConfig));
app.use(cookieParser());

// Passport config
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Login and register routes
app.use("/", authRouter);

// Movie routes
app.use("/movies", movieRouter);

// Comment routes
app.use("/comment", commentRouter);

// Rating routes
app.use("/rating", ratingRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
