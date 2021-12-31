import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'

const LoggedOut = () => {
  return (
    <div>
      <NavLink className="Navbar-option" to='/login'>Login</NavLink>
      <NavLink className="Navbar-option" to='/register'>Register</NavLink>
    </div>
  );
};

export default LoggedOut;