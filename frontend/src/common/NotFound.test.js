import React from "react";
import { render } from '@testing-library/react'
import NotFound from "./NotFound";
import { MemoryRouter } from "react-router-dom";

test('it renders without crashing', () => {
  render(<MemoryRouter>
    <NotFound />
  </MemoryRouter>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
})