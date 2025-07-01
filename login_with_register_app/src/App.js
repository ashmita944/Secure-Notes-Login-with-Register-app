import './App.css';
import Homepage from "./components/Homepage/homepage.js";
import "./components/Homepage/homepage.css";
import Login from "./components/Login/login.js";
import "./components/Login/login.css";
import Register from "./components/Register/register.js";
import "./components/Register/register.css";

import { Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [user, setLoginUser] = useState({});
  console.log("Current user in App.js:", user);

  return (
    <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              user && user._id ? (
                <Homepage setLoginUser={setLoginUser} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
  );
}

export default App;
