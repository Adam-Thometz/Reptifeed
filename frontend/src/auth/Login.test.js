import React from "react";
import { render } from '../utils/testUtils';
import Login from "./Login";

test('it renders without crashing', () => {
  render(<Login />);
});

test('it matches snapshot', () => {
  const { asFragment } = render(<Login />);
  expect(asFragment()).toMatchSnapshot();
});