import React from "react";
import { render } from '../utils/testUtils'
import Home from "./Home";

test('it renders without crashing', () => {
  render(<Home />);
});

test('it matches snapshot', () => {
  const { asFragment } = render(<Home />);
  expect(asFragment()).toMatchSnapshot();
});