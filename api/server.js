const express = require("express");
const app = express();
const { configureMongoDb } = require("./infrastructure/database-configuration/mongo-configuration");
const { configureMiddlewares } = require("./infrastructure/middlewares/base-middleware");
const movieRouter = require("./routes/movie-route");
const commentRouter = require("./routes/comment-route");
const ratingRouter = require("./routes/rating-route");
const authRouter = require("./routes/auth-route");

const PORT = process.env.PORT || 3001;

// Connecting to MongoDB
configureMongoDb();

// Middlewares
configureMiddlewares(app);

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
