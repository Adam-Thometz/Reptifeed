import React from "react";
import { render } from '@testing-library/react'
import EditReptileForm from "./EditReptileForm";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from '../utils/testUtils'

test('it renders without crashing', () => {
  render(<MemoryRouter initialEntries={['/users/1/reptiles/1/edit']}>
    <UserProvider>
      <EditReptileForm />
    </UserProvider>
  </MemoryRouter>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter initialEntries={['/users/1/reptiles/1/edit']}>
      <UserProvider>
        <EditReptileForm />
      </UserProvider>
    </MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
});