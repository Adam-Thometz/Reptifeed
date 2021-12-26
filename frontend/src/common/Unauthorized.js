import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <h4>You are not authorized to view this page! Here are your options:</h4>
      <Link to="/login">Log in to your account</Link>
      <Link to="/register">Register for an account with us</Link>
    </div>
  );
};

export default Unauthorized;