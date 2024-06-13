import React, { useState, createContext } from "react";
import "./App.scss";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Routess
import Routess from "./Router/Router";

export const UpdateProductNumb = createContext();

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          {Routess.map((R) => (
            <Route {...R} Element={R.element} key={R.path} />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// npx json-server --watch db.json --port 3006
