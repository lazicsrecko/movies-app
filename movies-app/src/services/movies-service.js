import axios from 'axios';

const getMovies = async () => {
    const res = await axios.get("http://localhost:3001/movies");
    
    if(res.statusText !== 'OK'){
        throw new Error('Something went wrong!');
    }

    return res.data;
}

const getMovieById = async (movieId) => {
    const res = await axios.get(`http://localhost:3001/movies/${movieId}`);

    if(res.statusText !== 'OK'){
        throw new Error('Something went wrong!');
    }
    
    return res.data;
}

const _getMovies = getMovies;
const _getMovieById = getMovieById;

export { 
    _getMovies as getMovies,
    _getMovieById as getMovieById
};