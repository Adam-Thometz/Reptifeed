import React from "react";
import { render } from '../utils/testUtils'
import LoggedOut from "./LoggedOut";

test('it renders without crashing', () => {
  render(<LoggedOut />);
});

test('it matches snapshot', () => {
  const { asFragment } = render(<LoggedOut />);
  expect(asFragment()).toMatchSnapshot();
});