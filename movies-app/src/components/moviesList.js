import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const MoviesList = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(async () => {
    const res = await axios.get("http://localhost:3001/movies");
    setMovies(res.data);
    console.log(movies);
  }, []);

  return (
    <div>
      {movies.map((movie) => (
        <Card sx={{ maxWidth: 345, margin: "2rem" }}>
          <CardMedia
            component="img"
            height="140"
            image={movie.poster}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.plot}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MoviesList;
