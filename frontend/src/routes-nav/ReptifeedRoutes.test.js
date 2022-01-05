import React from "react";
import ReptifeedRoutes from "./ReptifeedRoutes";
import { render, UserProvider } from "../utils/testUtils";

test('it renders without crashing', () => {
  render(<ReptifeedRoutes />);
});

test('it matches snapshot', () => {
  const { asFragment } = render(<ReptifeedRoutes />);
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot of login page', () => {
  const { asFragment } = render(<ReptifeedRoutes />, { initialRoutes: ['/login'] });
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot of registration page', () => {
  const { asFragment } = render(<ReptifeedRoutes />, { initialRoutes: ['/register'] });
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot of profile page', () => {
  const { asFragment } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/users/1'] });
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot of edit user page', () => {
  const { asFragment } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/users/1/edit'] });
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot of todos', () => {
  const todos = {
    essentialTodos: ['Buy a plumbus'],
    niceToHaveTodos: ['Figure out the plumbus']
  };
  const { asFragment } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: [{ pathname: '/users/1/todos', state: { todos } }] });
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot of reptiles page', () => {
  const { asFragment } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/users/1/reptiles'] });
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot of reptile page', () => {
  const { asFragment } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/users/1/reptiles/1'] });
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot of add new reptile', () => {
  const { asFragment } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/users/1/reptiles/add'] });
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot of edit reptile', () => {
  const { asFragment } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/users/1/reptiles/1/edit'] });
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot of food finder', () => {
  const { asFragment } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/foods'] });
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot of pantry', () => {
  const { asFragment } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/users/1/pantry'] });
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot of 404 page', () => {
  const { asFragment } = render(
    <UserProvider>
      <ReptifeedRoutes />
    </UserProvider>, { initialRoutes: ['/hello-lol'] });
  expect(asFragment()).toMatchSnapshot();
});