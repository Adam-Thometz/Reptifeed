import React from "react";
import { render } from '@testing-library/react'
import PantryCard from "./PantryCard";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from '../utils/testUtils'

test('it renders without crashing', () => {
  render(<MemoryRouter>
    <UserProvider>
      <PantryCard />
    </UserProvider>
  </MemoryRouter>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <PantryCard />
      </UserProvider>
    </MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
});