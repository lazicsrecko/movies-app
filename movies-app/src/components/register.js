import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { register } from "../services/auth-services";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Register = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onInputChange = (e) => {
    if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    }
    if (e.target.name === "lastName") {
      setLastName(e.target.value);
    }
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const onRegister = async () => {
    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    const user = await register(newUser);

    if (user) {
      setIsLoggedIn(true);
      navigate("/");
    }
  };

  return !isLoggedIn ? (
    <Paper
      style={{ width: "600px", margin: "5rem auto", padding: "3rem" }}
      elevation={3}
    >
      <Typography className="registerHeading" variant="h3">
        Register
      </Typography>
      <TextField
        className="inputFormFields"
        label="First Name"
        name="firstName"
        variant="outlined"
        onChange={onInputChange}
      />
      <TextField
        className="inputFormFields"
        label="Last Name"
        name="lastName"
        variant="outlined"
        onChange={onInputChange}
      />
      <TextField
        className="inputFormFields"
        label="Username"
        name="username"
        variant="outlined"
        onChange={onInputChange}
      />
      <TextField
        className="inputFormFields"
        label="Email"
        name="email"
        variant="outlined"
        onChange={onInputChange}
      />
      <TextField
        className="inputFormFields"
        label="Password"
        name="password"
        variant="outlined"
        onChange={onInputChange}
      />
      <Button
        className="inputFormFields"
        variant="contained"
        color="success"
        onClick={onRegister}
      >
        Register
      </Button>
      <Typography variant="body2">
        <Link className="authLinks" to="/login">
          Already have account
        </Link>
      </Typography>
    </Paper>
  ) : (
    <Navigate to="/" />
  );
};

export default Register;
