import React from "react";
import { render } from '@testing-library/react'
import Unauthorized from "./Unauthorized";
import { MemoryRouter } from "react-router-dom";

test('it renders without crashing', () => {
  render(<MemoryRouter>
    <Unauthorized />
  </MemoryRouter>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <Unauthorized />
    </MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
})