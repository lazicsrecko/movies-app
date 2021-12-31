import axios from "axios";

const commentMovie = async (comment) => {
  const res = await axios.post(`http://localhost:3001/comment`, comment, {
    withCredentials: true,
  });

  if (res.statusText !== "OK") {
    throw new Error("Something went wrong!");
  }

  return true;
};

const _commentMovie = commentMovie;

export { _commentMovie as commentMovie };
