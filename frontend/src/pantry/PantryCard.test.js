import React from "react";
import PantryCard from "./PantryCard";
import { render } from '../utils/testUtils'

test('it renders without crashing', () => {
  render(<PantryCard />);
});

test('it matches snapshot', () => {
  const { asFragment } = render(<PantryCard
    name="plumbus"
    type="everything"
    frequency="always"
    image=""
    isTreat={true}
  />);
  expect(asFragment()).toMatchSnapshot();
});