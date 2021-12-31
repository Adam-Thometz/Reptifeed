import React from "react";
import Reptile from "./Reptile";
import { render, UserProvider } from '../utils/testUtils';
import RequireAuth from "../routes-nav/RequireAuth";
import { Routes, Route } from 'react-router-dom';

test('it renders without crashing', () => {
  render(<UserProvider>
    <Routes>
      <Route path='/users/:id/reptiles/:reptileId' element={<RequireAuth><Reptile /></RequireAuth>} />
    </Routes>
  </UserProvider>, { initialRoutes: ['/users/1/reptiles/1'] });
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <Routes>
        <Route path='/users/:id/reptiles/:reptileId' element={<RequireAuth><Reptile /></RequireAuth>} />
      </Routes>
    </UserProvider>, { initialRoutes: ['/users/1/reptiles/1'] });
  expect(asFragment()).toMatchSnapshot();
});