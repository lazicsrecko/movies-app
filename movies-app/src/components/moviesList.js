import React, { useState, useEffect, Fragment } from "react";
import Spinner from "./spinner";
import { getMovies } from "../services/movies-service";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [partialLoad, setPartialLoad] = useState(10);
  const [hasMoreEntries, setHasMoreEntires] = useState(true);

  const fetchMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };
  const loadMore = () => {
    setPartialLoad((prevValue) => prevValue + 10);
    if (partialLoad > movies.length) {
      setHasMoreEntires(!hasMoreEntries);
    }
  };

  const filteredMovies = () => {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (searchTerm.length >= 3) {
      return filteredMovies;
    }
    return movies.sort((a, b) => b.rating - a.rating);
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
        {filteredMovies()
          .slice(0, partialLoad)
          .map((movie) => (
            <Grid item xs={4}>
              <Link
                key={movie._id}
                className="textDecorationNone"
                to={`/movies/${movie._id}`}
              >
                <Card sx={{ maxWidth: 345, margin: "2rem" }}>
                  {movie.rating && (
                    <CardContent className="movieRating">
                      <Typography variant="h4" component="span">
                        <StarIcon sx={{ color: "yellow" }} />
                        {movie.rating.toFixed(1)}
                      </Typography>
                    </CardContent>
                  )}
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
      {hasMoreEntries && (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            style={{ width: "40%", margin: "3rem 0" }}
            variant="contained"
            onClick={loadMore}
          >
            Load More
          </Button>
        </Grid>
      )}
    </Fragment>
  );
};

export default MoviesList;
