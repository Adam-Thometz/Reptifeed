import React from "react";
import { render, UserProvider } from '../utils/testUtils';
import NewReptileForm from "./NewReptileForm";

test('it renders without crashing', () => {
  render(<UserProvider>
    <NewReptileForm />
  </UserProvider>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <NewReptileForm />
    </UserProvider>);
  expect(asFragment()).toMatchSnapshot();
});