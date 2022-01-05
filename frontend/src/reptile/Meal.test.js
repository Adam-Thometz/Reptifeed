import React from "react";
import Meal from "./Meal";
import { render, UserProvider, pantry } from '../utils/testUtils';

test('it renders without crashing', () => {
  render(<UserProvider>
    <Meal meal={pantry} freq="often" />
  </UserProvider>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <Meal meal={pantry} freq="often" />
    </UserProvider>);
  expect(asFragment()).toMatchSnapshot();
});

test('it renders the correct info', () => {
  const { getByText } = render(<UserProvider>
    <Meal meal={pantry} freq="often" />
  </UserProvider>);
  
  expect(getByText('arugula')).toBeInTheDocument();
});