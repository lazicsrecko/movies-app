import axios from 'axios';

const getComments = async () => {
    const res = await axios.get("http://localhost:3001/movies");
    
    if(res.statusText !== 'OK'){
        throw new Error('Something went wrong!');
    }

    return res.data;
}

const commentMovie = async (comment) => {
    const res = await axios.post(`http://localhost:3001/comment`, comment);

    if(res.statusText !== 'OK'){
        throw new Error('Something went wrong!');
    }
    
    return true;
}

const _getComments = getComments;
const _commentMovie = commentMovie;

export { 
    _getComments as getComments,
    _commentMovie as commentMovie
};