import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Alert from "../common/Alert";
import UserContext from "../utils/UserContext";
import './Todos.css';

const Todos = () => {
  const { currUser, todos } = useContext(UserContext);

  document.title = `${currUser.username}'s To-do List | Reptifeed`

  const { essentialTodos, niceToHaveTodos } = todos;

  if (!essentialTodos.length && !niceToHaveTodos.length) return <Alert type="success" messages={["You've done everything you need to do. Just keep up the variety!", "Click here to go back to your profile"]} link={`/users/${currUser.id}`} />

  return (
    <div className="Todos">
      <h3>Click on one to get started</h3>
      <div className="Todos-wrapper">
        {essentialTodos.length ? (
          <div className="Todos-wrapper essential-wrapper">
            <h4>Essential</h4>
            {essentialTodos.map((t, i) => (
              <Link key={i} className="Todos-todo essential" to={(t === 'Add a reptile') ? `/users/${currUser.id}/reptiles/add` : '/foods'} >{t}</Link>
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