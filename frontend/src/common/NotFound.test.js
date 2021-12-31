import React from "react";
import { render } from '../utils/testUtils'
import NotFound from "./NotFound";

test('it renders without crashing', () => {
  render(<NotFound />);
});

test('it matches snapshot', () => {
  const { asFragment } = render(<NotFound />);
  expect(asFragment()).toMatchSnapshot();
})