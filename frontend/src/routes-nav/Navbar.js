import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../utils/UserContext";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

const Navbar = ({ logout }) => {
  const { currUser } = useContext(UserContext);
  return (
    <nav className="Navbar">
      <NavLink to="/">Reptifeed</NavLink>
      {currUser ? <LoggedIn logout={logout} /> : <LoggedOut />}
    </nav>
  );
};

export default Navbar;