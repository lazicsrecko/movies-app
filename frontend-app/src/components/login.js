import React, { useState, useContext } from "react";
import { Context } from "../context/user-context";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { login } from "../services/auth-services";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Login = (props) => {
  const { isLoggedIn, setIsLoggedIn, setErrorMessage } = props;
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onInputChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const onLogin = async () => {
    debugger;
    const credentials = {
      username,
      password,
    };

    const user = await login(credentials);

    if (user.user_id) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      navigate("/");
    } else {
      setErrorMessage(user.message);
    }
  };

  return !isLoggedIn ? (
    <Paper
      style={{ width: "600px", margin: "5rem auto", padding: "3rem" }}
      elevation={3}
    >
      <Typography className="registerHeading" variant="h3">
        Login
      </Typography>
      <TextField
        className="inputFormFields"
        label="Username"
        name="username"
        variant="outlined"
        onChange={onInputChange}
      />
      <TextField
        className="inputFormFields"
        inputProps={{ type: "password" }}
        label="Password"
        name="password"
        variant="outlined"
        onChange={onInputChange}
      />
      <Button
        className="inputFormFields"
        variant="contained"
        color="success"
        onClick={onLogin}
      >
        Login
      </Button>
      <Typography variant="body2">
        <Link className="authLinks" to="/register">
          Create New Account
        </Link>
      </Typography>
    </Paper>
  ) : (
    <Navigate to="/" />
  );
};

export default Login;
