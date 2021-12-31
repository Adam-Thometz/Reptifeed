import React from "react";
import EditReptileForm from "./EditReptileForm";
import { render, UserProvider } from '../utils/testUtils';
import RequireAuth from "../routes-nav/RequireAuth";
import { Routes, Route } from 'react-router-dom';

test('it renders without crashing', () => {
  render(<UserProvider>
    <Routes>
      <Route path='/users/:id/reptiles/:reptileId/edit' element={<RequireAuth><EditReptileForm /></RequireAuth>} />
    </Routes>
  </UserProvider>, { initialRoutes: ['/users/1/reptiles/1/edit'] });
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <Routes>
        <Route path='/users/:id/reptiles/:reptileId/edit' element={<RequireAuth><EditReptileForm /></RequireAuth>} />
      </Routes>
    </UserProvider>, { initialRoutes: ['/users/1/reptiles/1/edit'] });
  expect(asFragment()).toMatchSnapshot();
});