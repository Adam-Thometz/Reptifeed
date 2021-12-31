import React from "react";
import MealCard from "./MealCard";
import { render, UserProvider, pantry } from '../utils/testUtils';
import { Routes, Route } from 'react-router-dom';

test('it renders without crashing', () => {
  const { name, type, image } = pantry[0];
  render(<UserProvider>
    <Routes>
      <Route path='/users/:id/reptiles/:reptileId' element={<MealCard name={name} type={type} image={image} />} />
    </Routes>
  </UserProvider>, { initialRoutes: ['/users/1/reptiles/1'] });
});

test('it matches snapshot', () => {
  const { name, type, image } = pantry[0];
  const { asFragment } = render(
    <UserProvider>
      <Routes>
        <Route path='/users/:id/reptiles/:reptileId' element={<MealCard name={name} type={type} image={image} />} />
      </Routes>
    </UserProvider>, { initialRoutes: ['/users/1/reptiles/1'] });
  expect(asFragment()).toMatchSnapshot();
});