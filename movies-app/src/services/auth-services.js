import axios from "axios";

const session = JSON.parse(localStorage.getItem("session"));

// Register new user
const register = async (user) => {
  const res = await axios.post(`http://localhost:3001/register`, user);

  if (res.statusText !== "OK") {
    throw new Error("Something went wrong!");
  }
  localStorage.setItem(
    "session",
    JSON.stringify({
      _id: res.data._id,
      session_id: res.data.session_id,
    })
  );
  return res.data.user;
};

// Login with username and password
const login = async (credentials) => {
  const res = await axios.post(`http://localhost:3001/login`, credentials);
  console.log(res);
  if (res.statusText !== "OK") {
    throw new Error("Something went wrong!");
  }
  localStorage.setItem(
    "session",
    JSON.stringify({
      _id: res.data._id,
      session_id: res.data.session_id,
    })
  );
  return res.data.user;
};

// Logout
const logout = async () => {
  const res = await axios.get(`http://localhost:3001/logout`);

  if (res.statusText !== "OK") {
    throw new Error("Something went wrong");
  }
  localStorage.removeItem("session");
  return true;
};

const getUserData = async () => {
  const res = await axios.get(
    `http://localhost:3001/user/${session._id}/${session.session_id}`,
    {
      withCredentials: true,
    }
  );
  if (res.statusText !== "OK") {
    throw new Error("Something went wrong");
  }
  return res.data.user;
};

const _register = register;
const _login = login;
const _logout = logout;
const _getUserData = getUserData;

export {
  _register as register,
  _login as login,
  _logout as logout,
  _getUserData as getUserData,
};
