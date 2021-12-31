import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Profile from "./Profile";
import { render, UserProvider } from "../utils/testUtils";
import RequireAuth from "../routes-nav/RequireAuth";
import { Routes, Route } from 'react-router-dom';

test('it renders without crashing', () => {
  render(<UserProvider>
    <Routes>
      <Route path='/users/:id' element={<RequireAuth><Profile /></RequireAuth>} />
    </Routes>
  </UserProvider>, { initialRoutes: ['/users/1'] });
});

test('it matches snapshot for logged in user', () => {
  const { asFragment } = render(
    <UserProvider>
      <Routes>
        <Route path='/users/:id' element={<RequireAuth><Profile /></RequireAuth>} />
      </Routes>
    </UserProvider>, { initialRoutes: ['/users/1'] }
  );
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot for logged out user', () => {
  const { asFragment } = render(
    <UserProvider currUser={null}>
      <Routes>
        <Route path='/users/:id' element={<RequireAuth><Profile /></RequireAuth>} />
      </Routes>
    </UserProvider>, { initialRoutes: ['/users/1'] }
  );
  expect(asFragment()).toMatchSnapshot();
});

test('it renders a specific user', () => {
  const { getByText } = render(
    <UserProvider>
      <Routes>
        <Route path='/users/:id' element={<RequireAuth><Profile /></RequireAuth>} />
      </Routes>
    </UserProvider>, { initialRoutes: ['/users/1'] }
  );
  expect(getByText("Hello rickSanchez!")).toBeInTheDocument();
});