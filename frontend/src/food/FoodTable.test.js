import React from "react";
import FoodTable from "./FoodTable";
import { render, UserProvider } from '../utils/testUtils';

const food = [
  {
    name: 'cactus',
    type: 'vegetable',
    frequency: 'often',
    image: 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/2311591/5ab686083ea474ccd5e332dd39df9a79_large.png&width=256&type=webp&quality=80',
    isTreat: false,
    tips: ''
  },
  {
    name: 'dog food',
    type: 'protein',
    frequency: 'often',
    image: 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00036800086821/3b0b51456eaf177a3679cee48f7d6314_large.png&width=200&type=webp&quality=80',
    isTreat: false,
    tips: ''
  },
  {
    name: 'arugula',
    type: 'vegetable',
    frequency: 'often',
    image: 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/arugula_small.gif',
    isTreat: false,
    tips: ''
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