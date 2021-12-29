import React, { useState, useEffect } from 'react';
import { getMovieById } from '../services/movies-service';
import { commentMovie } from '../services/comment-service';
import { useParams } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const MovieDetails = (props) => {
    const [movie, setMovie] = useState(null);
    const [commentText, setCommentText] = useState('');
    const { movieId } = useParams();

    const fetchMovie = async (movieId) => {
        const data = await getMovieById(movieId);
        setMovie(data);
        console.log(data)
    }

    const onInputChage = (e) => {
        e.preventDefault();
        setCommentText(e.target.value);
    }

    const onCommentSubmit = async () => {
        const comment = {
            movie_id: movie._id,
            name: 'Test test',
            text: commentText,
            date: new Date()
        }
        const posted = await commentMovie(comment);

        if(posted){
            setCommentText('');
        }
    } 

    useEffect(() => {
        fetchMovie(movieId);
    }, []);
    if(movie !== null){
        return (<Box sx={{ flexGrow: 1, margin: '2rem' }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Card sx={{ maxWidth: 700 }}>
                        <CardMedia
                            component="img"
                            height="800"
                            image={movie.poster}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                {movie.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Directed by:
                                {movie.directors.map(director => (
                                    <Typography>
                                        {director}
                                    </Typography>
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
                                {movie.cast.map(actor => (
                                    <Typography>
                                        {actor}
                                    </Typography>
                                ))}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    {movie.comments && movie.comments.map(comment => (
                        <div>
                            <Typography variant="h5" color="text.primary">
                                {comment.name}
                            </Typography>
                            <Typography variant="body1" color="text.primary">
                                {comment.text}
                            </Typography>
                        </div>
                    ))}
                    <TextField
                        className="commentField"
                        id="outlined-textarea"
                        label="Comment"
                        value={commentText}
                        rows={3}
                        multiline
                        onChange={onInputChage}
                    />
                    <Button sx={{marginTop: '1rem'}} variant="contained" onClick={onCommentSubmit}>Comment</Button>
                </Grid>
            </Grid>
        </Box>)
    } else {
        return <div>Movie not found</div>
    }
}

export default MovieDetails;