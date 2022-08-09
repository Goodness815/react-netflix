import { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import "./app.scss"
import "toastify-js/src/toastify.css"
const App = () => {

  return <>
    <Routes>
      <Route path="/"
        element={<Home />} />
      <Route path="/register"
        element={<Register />} />
      <Route path="/login"
        element={<Login />} />

      <Route path="/movies" element={<Home type="movies" />} />
      <Route path="/series" element={<Home type="series" />} />
      <Route path="/watch/:id" element={<Watch />} />

      <Route path="*"
        element={<div>Page Not Found</div>} />
    </Routes>
  </>
};

export default App;