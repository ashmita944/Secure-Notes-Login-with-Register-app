import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:9002/login", user);
      alert(res.data.message);

      
      console.log("Login response user:", res.data.user);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setLoginUser(res.data.user); // update App.js
        navigate("/"); // redirect to root
      }
    } catch (error) {
      alert("Login failed. Try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter your Email"
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter your Password"
      />
      <div className="button" onClick={login}>Login</div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/register")}>Register</div>
    </div>
  );
};

export default Login;