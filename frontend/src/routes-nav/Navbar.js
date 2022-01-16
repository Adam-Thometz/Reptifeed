import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../utils/UserContext";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import './Navbar.css'

const Navbar = ({ logout }) => {
  const { currUser } = useContext(UserContext);
  return (
    <nav className="Navbar">
      <a className="Navbar-skip" href="#main">Skip to main content</a>
      <NavLink className="Navbar-header" to="/">Reptifeed</NavLink>
      {currUser ? <LoggedIn logout={logout} /> : <LoggedOut />}
    </nav>
  );
};

export default Navbar;