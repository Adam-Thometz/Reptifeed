import React from "react";
import Navbar from "./Navbar";
import { render, UserProvider } from '../utils/testUtils'

test('it renders without crashing', () => {
  render(<UserProvider>
    <Navbar />
  </UserProvider>);
});

test('it matches snapshot (logged in)', () => {
  const { asFragment } = render( 
    <UserProvider>
      <Navbar />
    </UserProvider>);
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot (logged out)', () => {
  const { asFragment } = render( 
    <UserProvider currUser={null}>
      <Navbar />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});