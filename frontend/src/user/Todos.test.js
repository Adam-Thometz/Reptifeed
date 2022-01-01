import React from "react";
import Todos from "./Todos";
import { render, UserProvider } from '../utils/testUtils';
import { Routes, Route } from 'react-router-dom';

test('it renders without crashing', () => {
  render(<UserProvider>
    <Routes>
      <Route
        location={{
          pathname: '/users/:id/todos',
          state: {
            todos: {
              essentialTodos: ['Buy a plumbus'],
              niceToHaveTodos: ['Figure out the plumbus']
            }
          }
        }} element={<Todos />}
      />
    </Routes>
  </UserProvider>, { initialRoutes: ['/users/1/todos'] });
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <Routes>
        <Route
          location={{
            pathname: '/users/:id/todos',
            state: {
              todos: {
                essentialTodos: ['Buy a plumbus'],
                niceToHaveTodos: ['Figure out the plumbus']
              }
            }
          }} element={<Todos />}
        />
      </Routes>
    </UserProvider>, { initialRoutes: ['/users/1/todos'] });
  expect(asFragment()).toMatchSnapshot();
});