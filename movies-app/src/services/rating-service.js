import axios from "axios";

const session = JSON.parse(localStorage.getItem("session"));

// Get rating by user and movie id
const getRateByMovieAndUserId = async (movieId, userId) => {
  const res = await axios.get(
    `http://localhost:3001/rating/${movieId}/${userId}/${session.session_id}`,
    {
      withCredentials: true,
    }
  );

  if (res.statusText !== "OK") {
    throw new Error("Something went wrong!");
  }
  return res.data;
};

// Post new rating
const rateMovie = async (rating) => {
  const res = await axios.post(
    `http://localhost:3001/rating/${session.session_id}`,
    rating,
    {
      withCredentials: true,
    }
  );

  if (res.statusText !== "OK") {
    throw new Error("Something went wrong!");
  }

  return true;
};

const _rateMovie = rateMovie;
const _getRateByMovieAndUserId = getRateByMovieAndUserId;

export {
  _rateMovie as rateMovie,
  _getRateByMovieAndUserId as getRateByMovieAndUserId,
};
