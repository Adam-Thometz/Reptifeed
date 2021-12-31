import React from "react";
import Meal from "./Meal";
import { render, UserProvider, pantry } from '../utils/testUtils';
import { Routes, Route } from 'react-router-dom';

test('it renders without crashing', () => {
  render(<UserProvider>
    <Routes>
      <Route path='/users/:id/reptiles/:reptileId' element={<Meal meal={pantry} freq="always" />} />
    </Routes>
  </UserProvider>, { initialRoutes: ['/users/1/reptiles/1'] });
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <Routes>
        <Route path='/users/:id/reptiles/:reptileId' element={<Meal meal={pantry} freq="always" />} />
      </Routes>
    </UserProvider>, { initialRoutes: ['/users/1/reptiles/1'] });
  expect(asFragment()).toMatchSnapshot();
});