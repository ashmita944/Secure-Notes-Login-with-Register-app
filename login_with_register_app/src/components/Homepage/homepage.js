import React from "react";
import "./homepage.css";

const Homepage = ({ setLoginUser }) => {
console.log("Homepage component loaded"); 

  return (
    <div className="homepage">
      <h1>Homepage</h1>
      <div className="button" onClick={() => setLoginUser({})}>
        Logout
      </div>
    </div>
  );
};

export default Homepage;