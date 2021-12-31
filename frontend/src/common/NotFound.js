import React from "react";
import { Link } from "react-router-dom";
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="NotFound">
      <h4>The page you're looking for wasn't found</h4>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default NotFound;