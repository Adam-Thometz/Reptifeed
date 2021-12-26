import React from "react";
import { render } from '@testing-library/react'
import Pantry from "./Pantry";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from '../utils/testUtils'

test('it renders without crashing', () => {
  render(<MemoryRouter>
    <UserProvider>
      <Pantry />
    </UserProvider>
  </MemoryRouter>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Pantry />
      </UserProvider>
    </MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
});