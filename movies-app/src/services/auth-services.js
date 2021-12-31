import axios from "axios";

// Register new user
const register = async (user) => {
  const res = await axios.post(`http://localhost:3001/register`, user);

  if (res.statusText !== "OK") {
    throw new Error("Something went wrong!");
  }
  localStorage.setItem("session_id", res.data.session_id);
  return res.data.user;
};

// Login with username and password
const login = async (credentials) => {
  const res = await axios.post(`http://localhost:3001/login`, credentials);
  console.log(res);
  if (res.statusText !== "OK") {
    throw new Error("Something went wrong!");
  }
  localStorage.setItem("session_id", res.data.session_id);
  return res.data.user;
};

// Logout
const logout = async () => {
  const res = await axios.get(`http://localhost:3001/logout`);

  if (res.statusText !== "OK") {
    throw new Error("Something went wrong");
  }
  localStorage.removeItem("session_id");
  return true;
};

const _register = register;
const _login = login;
const _logout = logout;

export { _register as register, _login as login, _logout as logout };
