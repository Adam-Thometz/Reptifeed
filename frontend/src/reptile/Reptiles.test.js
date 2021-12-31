import React from "react";
import Reptiles from "./Reptiles";
import { render, UserProvider } from "../utils/testUtils";
import RequireAuth from "../routes-nav/RequireAuth";
import { Routes, Route } from 'react-router-dom';

test('it renders without crashing', () => {
  render(<UserProvider>
    <Routes>
      <Route path='/users/:id/reptiles' element={<RequireAuth><Reptiles /></RequireAuth>} />
    </Routes>
  </UserProvider>, { initialRoutes: ['/users/1/reptiles'] });
});

test('it matches snapshot for logged in user', () => {
  const { asFragment } = render(
    <UserProvider>
      <Routes>
        <Route path='/users/:id/reptiles' element={<RequireAuth><Reptiles /></RequireAuth>} />
      </Routes>
    </UserProvider>, { initialRoutes: ['/users/1/reptiles'] }
  );
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot for logged out user', () => {
  const { asFragment } = render(
    <UserProvider currUser={null}>
      <Routes>
        <Route path='/users/:id/reptiles' element={<RequireAuth><Reptiles /></RequireAuth>} />
      </Routes>
    </UserProvider>, { initialRoutes: ['/users/1/reptiles'] }
  );
  expect(asFragment()).toMatchSnapshot();
});