import React from "react";
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import LoggedOut from "./LoggedOut";

test('it renders without crashing', () => {
  render(<MemoryRouter>
    <LoggedOut />
  </MemoryRouter>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <LoggedOut />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
})