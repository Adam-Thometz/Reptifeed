import React from "react";
import { render } from '@testing-library/react'
import Navbar from "./Navbar";
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../utils/testUtils'

test('it renders without crashing', () => {
  render(<MemoryRouter>
    <UserProvider>
      <Navbar />
    </UserProvider>
  </MemoryRouter>);
});

test('it matches snapshot (logged in)', () => {
  const { asFragment } = render( 
    <MemoryRouter>
      <UserProvider>
        <Navbar />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot (logged out)', () => {
  const { asFragment } = render( 
    <MemoryRouter>
      <UserProvider currUser={null}>
        <Navbar />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});