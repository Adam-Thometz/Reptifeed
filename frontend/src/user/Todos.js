import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alert from "../common/Alert";
import UserContext from "../utils/UserContext";
import './Todos.css';
import ReptifeedApi from "../api";
import { createTodos } from "../utils/feedingHelpers";

const Todos = () => {
  const { currUser, todos } = useContext(UserContext);
  const { id } = useParams()
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

  if (!essentialTodos.length && !niceToHaveTodos.length) return <Alert type="success" messages={["You've done everything you need to do. Just keep up the variety!", "Click here to go back to your profile"]} link={`/users/${user.id}`} />

  return (
    <div className="Todos">
      <h3>Click on one to get started</h3>
      <div className="Todos-wrapper">
        {essentialTodos.length ? (
          <div className="Todos-wrapper essential-wrapper">
            <h4>Essential</h4>
            {essentialTodos.map((t, i) => (
              <Link key={i} className="Todos-todo essential" to={(t === 'Add a reptile') ? `/users/${user.id}/reptiles/add` : '/foods'} >{t}</Link>
              ))}
          </div>
        ) : null}
        {niceToHaveTodos.length ? (
          <div className="Todos-wrapper niceToHave-wrapper">
            <h4>Nice to Have</h4>
            {niceToHaveTodos.map((t, i) => (
              <Link key={i} className="Todos-todo niceToHave" to="/foods" >{t}</Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Todos;