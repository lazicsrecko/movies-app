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
const movieRouter = require("./routes/movie-route");
const commentRouter = require("./routes/comment-route");
const ratingRouter = require("./routes/rating-route");

const PORT = process.env.PORT || 3001;

// MongoDB connection string
mongoose
  .connect(
    "mongodb+srv://admin:v9jxFgbJSUK3H5G@cluster0.znu9f.mongodb.net/moviesDB?retryWrites=true&w=majority"
  )
  .then(console.log("Database connected!"))
  .catch((err) => console.log(err));

// Middleware
app.use(logger("dev"));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Movie routes
app.use("/movies", movieRouter);

// Comment routes
app.use("/comment", commentRouter);

// Rating routes
app.use("/rating", ratingRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
