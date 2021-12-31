import React from "react";
import NewReptileForm from "./NewReptileForm";
import { render, UserProvider } from '../utils/testUtils';
import RequireAuth from "../routes-nav/RequireAuth";
import { Routes, Route } from 'react-router-dom';

test('it renders without crashing', () => {
  render(<UserProvider>
    <Routes>
      <Route path='/users/:id/reptiles/add/' element={<RequireAuth><NewReptileForm /></RequireAuth>} />
    </Routes>
  </UserProvider>, { initialRoutes: ['/users/1/reptiles/add'] });
});

test('it matches snapshot', () => {
  const { asFragment } = render(
    <UserProvider>
      <Routes>
        <Route path='/users/:id/reptiles/add/' element={<RequireAuth><NewReptileForm /></RequireAuth>} />
      </Routes>
    </UserProvider>, { initialRoutes: ['/users/1/reptiles/add'] });
  expect(asFragment()).toMatchSnapshot();
});