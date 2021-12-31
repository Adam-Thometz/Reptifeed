import React from "react";
import { render } from '@testing-library/react'
import FoodOptions from "./FoodOptions";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from '../utils/testUtils'

test('it renders without crashing', () => {
  render(<MemoryRouter>
    <UserProvider>
      <FoodOptions />
    </UserProvider>
  </MemoryRouter>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <FoodOptions />
      </UserProvider>
    </MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
})