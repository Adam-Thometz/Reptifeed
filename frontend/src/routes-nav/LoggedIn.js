import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../utils/UserContext";
import './Navbar.css'

const LoggedIn = ({ logout }) => {
  const { currUser } = useContext(UserContext)
  const userId = currUser.id
  return (
    <div>
      <NavLink className="Navbar-option" to={`/users/${userId}/reptiles`}>My Reptiles</NavLink>
      <NavLink className="Navbar-option" to={`/users/${userId}/pantry`}>My Pantry</NavLink>
      <NavLink className="Navbar-option" to={`/users/${userId}`}>My Account</NavLink>
      <NavLink className="Navbar-option" to="/" onClick={logout}>Log out</NavLink>
    </div>
  );
};

export default LoggedIn;