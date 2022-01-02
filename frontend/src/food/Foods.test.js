import React from "react";
import Foods from "./Foods";
import { render, UserProvider } from '../utils/testUtils';

test('it renders without crashing', () => {
  render(<UserProvider>
    <Foods />
  </UserProvider>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <Foods />
    </UserProvider>);
  expect(asFragment()).toMatchSnapshot();
});