import React from "react";
import { render } from '@testing-library/react'
import FoodTable from "./FoodTable";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from '../utils/testUtils'

test('it renders without crashing', () => {
  render(<MemoryRouter>
    <UserProvider>
      <FoodTable />
    </UserProvider>
  </MemoryRouter>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <FoodTable />
      </UserProvider>
    </MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
});