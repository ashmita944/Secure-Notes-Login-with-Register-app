import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const register = async () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      try {
        const res = await axios.post("http://localhost:9002/register", {
          name,
          email,
          password
        });
        alert(res.data.message);
        navigate("/login");
      } catch (error) {
        alert("Registration failed.");
        console.error("Registration error:", error);
      }
    } else {
      alert("Invalid input. Check all fields.");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange} />
      <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange} />
      <input type="password" name="password" value={user.password} placeholder="Enter Password" onChange={handleChange} />
      <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange} />
      <div className="button" onClick={register}>Register</div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/login")}>Login</div>
    </div>
  );
};

export default Register;