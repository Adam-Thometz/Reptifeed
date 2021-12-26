import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Popup from 'reactjs-popup';
import UserContext from "../utils/UserContext";

const LoggedIn = ({ logout }) => {
  const { currUser } = useContext(UserContext)
  const userId = currUser.id
  return (
    <Popup trigger={<button>My Stuff</button>} position="bottom right">
      <div>
        <NavLink to={`/users/${userId}/reptiles`}>My Reptiles</NavLink>
        <NavLink to={`/users/${userId}/pantry`}>My Pantry</NavLink>
        <NavLink to={`/users/${userId}`}>My Account</NavLink>
        <NavLink to="/" onClick={logout}>Log out</NavLink>
      </div>
    </Popup>
  );
};

export default LoggedIn;