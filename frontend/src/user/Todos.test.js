import React from "react";
import Todos from "./Todos";
import { render, UserProvider } from '../utils/testUtils';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from "../routes-nav/RequireAuth";

test('it renders without crashing', () => {
  const todos = {
    essentialTodos: ['Buy a plumbus'],
    niceToHaveTodos: ['Figure out the plumbus']
  };
  render(<UserProvider>
    <Routes>
      <Route path='/users/:id/todos' element={<RequireAuth><Todos /></RequireAuth>} />
    </Routes>
  </UserProvider>, { initialRoutes: [{ pathname: '/users/1/todos', state: { todos } }] });
});

test('it matches snapshot', () => {
  const todos = {
    essentialTodos: ['Buy a plumbus'],
    niceToHaveTodos: ['Figure out the plumbus']
  };
  const { asFragment } = render(
    <UserProvider>
      <Routes>
        <Route path='/users/:id/todos' element={<RequireAuth><Todos /></RequireAuth>} />
      </Routes>
    </UserProvider>, { initialRoutes: [{ pathname: '/users/1/todos', state: { todos } }] });
  expect(asFragment()).toMatchSnapshot();
});