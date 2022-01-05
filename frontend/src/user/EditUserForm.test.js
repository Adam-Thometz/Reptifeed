import React from "react";
import EditUserForm from "./EditUserForm";
import { render, UserProvider } from '../utils/testUtils'

test('it renders without crashing', () => {
  render(<UserProvider>
    <EditUserForm />
  </UserProvider>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <EditUserForm />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});