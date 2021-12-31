import React from "react";
import { render } from '../utils/testUtils';
import Register from "./Register";

test('it renders without crashing', () => {
  render(<Register />);
});

test('it matches snapshot', () => {
  const { asFragment } = render(<Register />);
  expect(asFragment()).toMatchSnapshot();
});