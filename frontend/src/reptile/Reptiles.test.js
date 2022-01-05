import React from "react";
import { render, UserProvider } from "../utils/testUtils";
import ReptifeedRoutes from '../routes-nav/ReptifeedRoutes';
import Reptiles from './Reptiles'

test('it renders without crashing', () => {
  render(<UserProvider>
    <Reptiles />
  </UserProvider>);
});

test('it matches snapshot for logged in user', () => {
  const { asFragment } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/users/1/reptiles'] }
  );
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot for logged out user', () => {
  const { asFragment } = render(
    <UserProvider currUser={null}>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/users/1/reptiles'] }
  );
  expect(asFragment()).toMatchSnapshot();
});