import React from "react";
import { NavLink } from "react-router-dom";

const LoggedOut = () => {
  return (
    <div>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/register'>Register</NavLink>
    </div>
  );
};

export default LoggedOut;