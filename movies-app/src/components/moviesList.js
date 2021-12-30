import React, { useState, useEffect } from "react";
import { getMovies } from '../services/movies-service';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from 'react-router-dom';

const MoviesList = (props) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const data = await getMovies();
    setMovies(data);
    console.log(movies)
  }

  useEffect(() => {
    fetchMovies()
  }, []);

  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item xs={4}>
          <Link key={movie._id} className="textDecorationNone" to={`/movies/${movie._id}`}>
            <Card sx={{ maxWidth: 345, margin: "2rem" }}>
              <CardMedia
                component="img"
                height="500"
                image={movie.poster}
                alt="#"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default MoviesList;
