import React from "react";
import MealCard from "./MealCard";
import { render, UserProvider, pantry } from '../utils/testUtils';

test('it renders without crashing', () => {
  const { name, type, image } = pantry[0];
  render(<UserProvider>
    <MealCard name={name} type={type} image={image} />
  </UserProvider>);
});

test('it matches snapshot', () => {
  const { name, type, image } = pantry[0];
  const { asFragment } = render(
    <UserProvider>
      <MealCard name={name} type={type} image={image} />
    </UserProvider>);
  expect(asFragment()).toMatchSnapshot();
});

test('it renders the correct info', () => {
  const { name, type, image } = pantry[0];
  const { getByText } = render(<UserProvider>
    <MealCard name={name} type={type} image={image} />
  </UserProvider>);
  
  expect(getByText('arugula')).toBeInTheDocument();
});