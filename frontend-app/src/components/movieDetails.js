import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/user-context";
import Spinner from "./spinner";
import { getMovieById } from "../services/movies-service";
import { commentMovie } from "../services/comment-service";
import { rateMovie, getRateByMovieAndUserId } from "../services/rating-service";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";

const MovieDetails = (props) => {
  const [movie, setMovie] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [rateInput, setRateInput] = useState(0);
  const { movieId } = useParams();
  const { currentUser } = useContext(Context);

  const fetchMovie = async (movieId) => {
    const movieData = await getMovieById(movieId);
    const rateData = await getRateByMovieAndUserId(
      movieId,
      currentUser.user_id
    );
    setMovie(movieData);
    if (!rateData) {
      setRateInput(0);
    } else {
      setRateInput(rateData.rating);
    }
  };

  const onInputChage = (e) => {
    e.preventDefault();
    setCommentText(e.target.value);
  };

  const onRatingChange = async (e) => {
    setRateInput(e.target.value);
  };

  const onRatingSubmit = async () => {
    const rating = {
      user_id: currentUser.user_id,
      movie_id: movie._id,
      date: new Date(),
      rating: parseInt(rateInput),
    };
    const rate = await rateMovie(rating);

    if (rate) {
      fetchMovie(movieId);
    }
  };

  const onCommentSubmit = async () => {
    const comment = {
      movie_id: movie._id,
      user_id: currentUser.user_id,
      text: commentText,
      date: new Date(),
    };
    const posted = await commentMovie(comment);

    if (posted) {
      setCommentText("");
      fetchMovie(movieId);
    }
  };

  useEffect(() => {
    fetchMovie(movieId);
  }, []);
  if (movie !== null) {
    return (
      <Box sx={{ flexGrow: 1, margin: "2rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 700 }}>
              {movie.rating && (
                <CardContent className="movieRating">
                  <Typography variant="h4" component="span">
                    <StarIcon sx={{ color: "yellow" }} />
                    {movie.rating.toFixed(1)}
                  </Typography>
                </CardContent>
              )}
              <CardMedia
                className="cardImage"
                component="img"
                image={movie.poster}
                alt="#"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {movie.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Directed by:
                  {movie.directors.map((director) => (
                    <Typography key="director">{director}</Typography>
                  ))}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  Year: {movie.year}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  Rated: {movie.rated}
                </Typography>
                <hr />
                <Typography variant="body1" color="text.primary">
                  {movie.plot}
                </Typography>
                <hr />
                <Typography variant="body1" color="text.secondary">
                  Cast:
                  {movie.cast.map((actor) => (
                    <Typography>{actor}</Typography>
                  ))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item style={{ borderLeft: "solid #d1d1d1 1px" }} xs={6}>
            <Typography gutterBottom variant="h4" component="div">
              Rating
            </Typography>
            <Rating onChange={onRatingChange} max={10} value={rateInput} />
            <Button
              className="btn"
              variant="contained"
              onClick={onRatingSubmit}
            >
              Rate
            </Button>
            <Typography gutterBottom variant="h4" component="div">
              Comments
            </Typography>
            {movie.comments.length < 1 ? (
              <Card style={{ marginBottom: "0.5rem", padding: "1rem" }}>
                <Typography gutterBottom variant="body1" component="div">
                  Be first to comment!
                </Typography>
              </Card>
            ) : (
              movie.comments.map((comment) => (
                <Card style={{ marginBottom: "0.5rem", padding: "0.5rem" }}>
                  <Typography variant="h5" color="text.primary">
                    {`${comment.user_id.firstName} ${comment.user_id.lastName}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {comment.text}
                  </Typography>
                </Card>
              ))
            )}
            <TextField
              className="commentField"
              id="outlined-textarea"
              label="Comment"
              value={commentText}
              rows={3}
              multiline
              onChange={onInputChage}
            />
            <Button
              className="btn"
              variant="contained"
              onClick={onCommentSubmit}
            >
              Comment
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return (
      <Box className="spinner">
        <Spinner />
      </Box>
    );
  }
};

export default MovieDetails;
