import axios from "axios";

const rateMovie = async (rating) => {
  const res = await axios.post(`http://localhost:3001/rating`, rating);

  if (res.statusText !== "OK") {
    throw new Error("Something went wrong!");
  }

  return true;
};

const _rateMovie = rateMovie;

export { _rateMovie as rateMovie };
