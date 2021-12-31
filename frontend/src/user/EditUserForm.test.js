import React from "react";
import EditUserForm from "./EditUserForm";
import { render, UserProvider } from '../utils/testUtils'

test('it renders without crashing', () => {
  render(<UserProvider>
    <EditUserForm />
  </UserProvider>, { initialRoutes: ['/users/1/edit'] });
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <EditUserForm />
    </UserProvider>, { initialRoutes: ['/users/1/edit'] }
  );
  expect(asFragment()).toMatchSnapshot();
});