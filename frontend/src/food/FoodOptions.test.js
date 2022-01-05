import React from "react";
import FoodOptions from "./FoodOptions";
import { render, UserProvider } from '../utils/testUtils'

test('it renders without crashing', () => {
  render(<UserProvider>
    <FoodOptions />
  </UserProvider>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <FoodOptions />
    </UserProvider>);
  expect(asFragment()).toMatchSnapshot();
})