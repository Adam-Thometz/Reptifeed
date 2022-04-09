import React, { useContext } from "react";
import Unauthorized from "../common/Unauthorized";
import UserContext from "../utils/UserContext";
import { useParams } from 'react-router-dom'

const RequireAuth = ({ children, adminOnly = false }) => {
  const { currUser } = useContext(UserContext);
  const { id } = useParams();

  if (currUser) {
    if (adminOnly) {
      if (currUser.isAdmin) {
        return children;
      } else {
        return <Unauthorized />;
      }
    }
    else {
      if (id) {
        if (currUser.isAdmin || currUser.id === +id) {
          return children;
        } else {
          return <Unauthorized />;
        }
      } else {
        if (currUser) {
          return children;
        } else {
          return <Unauthorized />;
        }
      }
    }
  } else {
    return <Unauthorized />;
  }
}

export default RequireAuth;