import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/protectedRoutes";
import Register from "./components/register";
import Login from "./components/login";
import Navigation from "./components/naviagation";
import MoviesList from "./components/moviesList";
import MovieDetails from "./components/movieDetails";
import FourOFour from "./components/fourOFour";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const getSessionId = () => {
    const session_id = localStorage.getItem("session_id");
    if (session_id) {
      setIsLoggedIn(session_id);
    }
  };
  useEffect(() => {
    getSessionId();
    console.log(getSessionId());
  }, []);
  return (
    <Router>
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoutes isAuthenticated={isLoggedIn} />}
        >
          <Route path="/" element={<MoviesList />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        </Route>
        <Route
          path="/login"
          element={
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/register"
          element={
            <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
