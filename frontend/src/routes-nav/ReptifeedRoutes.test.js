import React from "react";
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import ReptifeedRoutes from "./ReptifeedRoutes";
import { UserProvider } from "../utils/testUtils";

test('it renders without crashing', () => {
  render(<MemoryRouter>
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>
  </MemoryRouter>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <ReptifeedRoutes />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});