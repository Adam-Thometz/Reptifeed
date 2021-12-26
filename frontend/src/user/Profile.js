import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../utils/UserContext";

const Profile = () => {
  const { currUser } = useContext(UserContext);
  const { id } = useParams();

  return (
    <div className="Profile">
      <h1 className="Profile-header">Hello {currUser.username}!</h1>

      <div className="Profile-reptile-options">
        <Link to={`/users/${+id}/reptiles`}>See your reptiles</Link>
        <Link to={`/users/${+id}/reptiles/add`}>Add a reptile</Link>
      </div>
      <div className="Profile-pantry-options">
        <Link to={`/users/${+id}/pantry`}>See your pantry</Link>
        <Link to="/foods">Check out foods to add to pantry</Link>
      </div>
      <div className="Profile-user-options">
        <Link to={`/users/${+id}/edit`}>Edit your profile</Link>
        <Link to="/foods">Delete account</Link>
      </div>
    </div>
  );
};

export default Profile;