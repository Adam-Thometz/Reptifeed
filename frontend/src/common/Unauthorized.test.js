import React from "react";
import { render } from '../utils/testUtils';
import Unauthorized from "./Unauthorized";

test('it renders without crashing', () => {
  render(<Unauthorized />);
});

test('it matches snapshot', () => {
  const { asFragment } = render(<Unauthorized />);
  expect(asFragment()).toMatchSnapshot();
})