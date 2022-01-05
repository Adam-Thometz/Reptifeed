import React from "react";
import Pantry from "./Pantry";
import { render, UserProvider } from '../utils/testUtils'
import ReptifeedRoutes from '../routes-nav/ReptifeedRoutes'

test('it renders without crashing', () => {
  render(<UserProvider>
    <Pantry />
  </UserProvider>);
});

test('it renders on correct webpage', () => {
  render(<UserProvider>
    <ReptifeedRoutes />
  </UserProvider>, { initialRoutes: ['/users/1/pantry'] });
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <Pantry />
    </UserProvider>, { initialRoutes: ['/users/1/pantry'] });
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot when no pantry', () => {
  const { asFragment } = render(
    <UserProvider pantry={[]}>
      <Pantry />
    </UserProvider>, { initialRoutes: ['/users/1/pantry'] });
  expect(asFragment()).toMatchSnapshot();
});