import React from "react";
import { render, UserProvider } from '../utils/testUtils';
import ReptifeedRoutes from "../routes-nav/ReptifeedRoutes";

test('it renders without crashing', () => {
  render(<UserProvider>
    <ReptifeedRoutes />
  </UserProvider>, { initialRoutes: ['/users/1/reptiles/1/edit'] });
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/users/1/reptiles/1/edit'] });
  expect(asFragment()).toMatchSnapshot();
});

test('it renders the correct info', () => {
  const { getByDisplayValue } = render(<UserProvider>
    <ReptifeedRoutes />
  </UserProvider>, { initialRoutes: ['/users/1/reptiles/1/edit'] });
  
  expect(getByDisplayValue('two crows')).toBeInTheDocument();
});