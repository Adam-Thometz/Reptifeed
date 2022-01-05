import React from "react";
import Pantry from "./Pantry";
import { render, UserProvider } from '../utils/testUtils'

test('it renders without crashing', () => {
  render(<UserProvider>
    <Pantry />
  </UserProvider>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <Pantry />
    </UserProvider>);
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot when no pantry', () => {
  const { asFragment } = render(
    <UserProvider pantry={[]}>
      <Pantry />
    </UserProvider>);
  expect(asFragment()).toMatchSnapshot();
});