import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../utils/UserContext";
import reptileIcon from './profile-imgs/reptile.png';
import pantryIcon from './profile-imgs/pantry.png';
import userIcon from './profile-imgs/user.png';
import './Profile.css';
import ReptifeedApi from "../api";
import { createTodos } from "../utils/todoHelpers";

const Profile = () => {
  const { currUser, todos } = useContext(UserContext);
  const { id } = useParams();
  const [user, setUser] = useState(currUser);
  const [userTodos, setUserTodos] = useState(todos);

  useEffect(() => {
    async function getUserInfo() {
      if (currUser.isAdmin && currUser.id !== +id) {
        const targetUser = await ReptifeedApi.getUser(+id)
        setUser(targetUser);
        const userReptiles = await ReptifeedApi.getReptilesByOwner(+id);
        const userPantry = await ReptifeedApi.getPantry(+id);
        setUserTodos(createTodos(userReptiles, userPantry));
      };
    };
    getUserInfo();
  }, [currUser.id, currUser.isAdmin, id]);

  const { essentialTodos, niceToHaveTodos } = userTodos;

  return (
    <div className="Profile">
      <h1 className="Profile-header">{user.username}</h1>
     {(essentialTodos.length || niceToHaveTodos.length) ? (
       <Link className="Profile-todo-link" to={`/users/${+id}/todos`}>Click here for next steps!</Link>
     ) : null}
      <div className="Profile-section reptile">
        <div className="Profile-options">
          <Link to={`/users/${+id}/reptiles`}>See your reptiles</Link>
          <Link to={`/users/${+id}/reptiles/add`}>Add a reptile</Link>
        </div>
        <img className="Profile-icon" src={reptileIcon} alt='' />
      </div>
      <div className="Profile-section pantry">
        <img className="Profile-icon" src={pantryIcon} alt='' />
        <div className="Profile-options">
          <Link to={`/users/${+id}/pantry`}>See your pantry</Link>
          <Link to="/foods">Add foods to pantry</Link>
        </div>
      </div>
      <div className="Profile-section user">
        <div className="Profile-options">
          <Link to={`/users/${+id}/edit`}>Edit your profile</Link>
          <Link to="/foods">Delete account</Link>
        </div>
        <img className="Profile-icon" src={userIcon} alt='' />
      </div>
    </div>
  );
};

export default Profile;