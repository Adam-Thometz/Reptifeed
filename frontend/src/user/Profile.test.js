import React from "react";
import { render, UserProvider } from "../utils/testUtils";
import ReptifeedRoutes from "../routes-nav/ReptifeedRoutes";

test('it renders without crashing', () => {
  render(<UserProvider>
    <ReptifeedRoutes />
  </UserProvider>, { initialRoutes: ['/users/1'] });
});

test('it matches snapshot for logged in user', () => {
  const { asFragment } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/users/1'] }
  );
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot for logged out user', () => {
  const { asFragment } = render(
    <UserProvider currUser={null}>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/users/1'] }
  );
  expect(asFragment()).toMatchSnapshot();
});

test('it renders a specific user', () => {
  const { getByText } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/users/1'] }
  );
  expect(getByText("Hello rickSanchez!")).toBeInTheDocument();
});