import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/protectedRoutes";
import Alerts from "./components/alert";
import Register from "./components/register";
import Login from "./components/login";
import Navigation from "./components/naviagation";
import MoviesList from "./components/moviesList";
import MovieDetails from "./components/movieDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSetErrorMessage = (setBool) => {
    setErrorMessage(setBool);
  };

  const getSessionId = () => {
    const session = localStorage.getItem("session");
    if (session) {
      setIsLoggedIn(session);
    }
  };
  useEffect(() => {
    getSessionId();
  }, []);
  return (
    <Router>
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route
          path="/login"
          element={
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setErrorMessage={onSetErrorMessage}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setErrorMessage={onSetErrorMessage}
            />
          }
        />
        <Route
          path="/"
          element={<ProtectedRoutes isAuthenticated={isLoggedIn} />}
        >
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        </Route>
      </Routes>
      <Alerts
        open={errorMessage}
        message={errorMessage}
        closeAlert={onSetErrorMessage}
      />
    </Router>
  );
}

export default App;
