import React from "react";
import { render, UserProvider } from '../utils/testUtils';
import ReptifeedRoutes from "../routes-nav/ReptifeedRoutes";

test('it renders without crashing', () => {
  render(<UserProvider>
    <ReptifeedRoutes />
  </UserProvider>, { initialRoutes: ['/users/1/todos'] });
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/users/1/todos'] });
  expect(asFragment()).toMatchSnapshot();
});