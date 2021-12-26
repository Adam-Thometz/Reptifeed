import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h4>The page you're looking for wasn't found</h4>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default NotFound;