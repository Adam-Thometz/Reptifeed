import React from "react";
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import LoggedIn from "./LoggedIn";
import { UserProvider } from "../utils/testUtils";

test('it renders without crashing', () => {
  render(<MemoryRouter>
    <UserProvider>
      <LoggedIn />
    </UserProvider>
  </MemoryRouter>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <LoggedIn />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});