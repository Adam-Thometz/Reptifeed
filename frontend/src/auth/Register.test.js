import React from "react";
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from "./Register";

test('it renders without crashing', () => {
  render(<MemoryRouter>
    <Register />
  </MemoryRouter>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});