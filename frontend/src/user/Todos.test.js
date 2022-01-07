import React from "react";
import { render, UserProvider } from '../utils/testUtils';
import ReptifeedRoutes from "../routes-nav/ReptifeedRoutes";

test('it renders without crashing', () => {
  const todos = {
    essentialTodos: ['Buy a plumbus'],
    niceToHaveTodos: ['Figure out the plumbus']
  };
  render(<UserProvider>
    <ReptifeedRoutes />
  </UserProvider>, { initialRoutes: ['/users/1/todos'] });
});

test('it matches snapshot', () => {
  const todos = {
    essentialTodos: ['Buy a plumbus'],
    niceToHaveTodos: ['Figure out the plumbus']
  };
  const { asFragment } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/users/1/todos'] });
  expect(asFragment()).toMatchSnapshot();
});