import React from "react";
import LoggedIn from "./LoggedIn";
import { render, UserProvider } from "../utils/testUtils";

test('it renders without crashing', () => {
  render(<UserProvider>
    <LoggedIn />
  </UserProvider>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <LoggedIn />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});