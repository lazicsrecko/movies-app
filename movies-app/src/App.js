import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/naviagation";
import MoviesList from "./components/moviesList";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies" element={<MoviesList />} />
      </Routes>
    </Router>
  );
}

export default App;
