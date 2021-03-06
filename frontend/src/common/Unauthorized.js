import React from "react";
import { Link } from "react-router-dom";
import './Unauthorized.css'

const Unauthorized = () => {
  document.title = `Unauthorized access | Reptifeed`;

  return (
    <div tabIndex={0} className="Unauthorized">
      <h1>You are not authorized to view this page! Here are your options:</h1>
      <div className="Unauthorized-options">
        <Link to="/login">Log in to your account</Link>
        <Link to="/register">Register for an account with us</Link>
      </div>
    </div>
  );
};

export default Unauthorized;