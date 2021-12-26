import React from "react";
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from "./Login";

test('it renders without crashing', () => {
  render(<MemoryRouter>
    <Login />
  </MemoryRouter>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});