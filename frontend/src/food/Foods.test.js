import React from "react";
import { render } from '@testing-library/react'
import Foods from "./Foods";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from '../utils/testUtils'

test('it renders without crashing', () => {
  render(<MemoryRouter>
    <UserProvider>
      <Foods />
    </UserProvider>
  </MemoryRouter>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Foods />
      </UserProvider>
    </MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
})