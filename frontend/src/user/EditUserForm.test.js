import React from "react";
import { render } from '@testing-library/react'
import EditUserForm from "./EditUserForm";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from '../utils/testUtils'

test('it renders without crashing', () => {
  render(<MemoryRouter>
    <UserProvider>
      <EditUserForm />
    </UserProvider>
  </MemoryRouter>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <EditUserForm />
      </UserProvider>
    </MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
});