import React from "react";
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom';
import Profile from "./Profile";
import { UserProvider } from "../utils/testUtils";

test('it renders without crashing', () => {
  render(<MemoryRouter>
    <UserProvider>
      <Profile />
    </UserProvider>
  </MemoryRouter>);
});

test('it matches snapshot for logged in user', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Profile />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot for logged out user', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider currUser={null}>
        <Profile />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('it renders a specific user', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/users/1']}>
      <UserProvider>
        <Profile />
      </UserProvider>
    </MemoryRouter>
  );
  expect(getByText("Hello rickSanchez!")).toBeInTheDocument();
});