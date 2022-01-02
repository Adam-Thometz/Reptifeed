import React, { useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import './Todos.css';

const Todos = () => {
  debugger;
  const { currUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  if (!location.state.todos) navigate(`/users/${currUser.id}`);
  
  const { essentialTodos, niceToHaveTodos } = location.state.todos;

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