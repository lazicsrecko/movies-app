const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const movieRouter = require("./routes/movies");
const commentRouter = require("./routes/comments");
const ratingRouter = require("./routes/rating");

const PORT = process.env.PORT || 3001;

// MongoDB connection string
mongoose
  .connect(
    "mongodb+srv://admin:v9jxFgbJSUK3H5G@cluster0.znu9f.mongodb.net/moviesDB?retryWrites=true&w=majority"
  )
  .then(console.log("Database connected!"))
  .catch((err) => console.log(err));

// Helper tools
app.use(logger("dev"));
app.use(cors());
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
