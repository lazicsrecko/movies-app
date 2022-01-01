import React, { useState, useEffect, Fragment, useContext } from "react";
import Spinner from "./spinner";
import { getMovies } from "../services/movies-service";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
import { Context } from "../context/user-context";

const MoviesList = (props) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useContext(Context);

  const fetchMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  const filteredMovies = () => {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (searchTerm.length >= 3) {
      return filteredMovies;
    }
    return movies;
  };

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return movies.length < 1 ? (
    <Box className="spinner">
      <Spinner />
    </Box>
  ) : (
    <Fragment>
      <SearchBar searchChange={onSearchChange} />
      <Grid container spacing={2}>
        {filteredMovies().map((movie) => (
          <Grid item xs={4}>
            <Link
              key={movie._id}
              className="textDecorationNone"
              to={`/movies/${movie._id}`}
            >
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
    </Fragment>
  );
};

export default MoviesList;
