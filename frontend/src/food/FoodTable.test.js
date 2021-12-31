import React from "react";
import FoodTable from "./FoodTable";
import { render, UserProvider } from '../utils/testUtils'

const food = [
  {
    name: 'plumbus',
    type: 'everything',
    frequency: 'always',
    image: '',
    isTreat: true,
    tips: "Everyone needs a plumbus!"
  }
];

test('it renders without crashing', () => {
  render(<UserProvider>
    <FoodTable foods={food} />
  </UserProvider>);
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <FoodTable foods={food} />
    </UserProvider>);
  expect(asFragment()).toMatchSnapshot();
});