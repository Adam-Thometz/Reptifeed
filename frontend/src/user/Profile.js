import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../utils/UserContext";
import reptileIcon from './profile-imgs/reptile.png';
import pantryIcon from './profile-imgs/pantry.png';
import userIcon from './profile-imgs/user.png';
import './Profile.css';

const Profile = () => {
  const { currUser, todos } = useContext(UserContext);
  const { id } = useParams();

  const { essentialTodos, niceToHaveTodos } = todos;

  return (
    <div className="Profile">
      <h1 className="Profile-header">{currUser.username}</h1>
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