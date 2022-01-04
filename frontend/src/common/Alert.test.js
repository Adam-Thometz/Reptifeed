import React from "react";
import { render } from '../utils/testUtils';
import Alert from "./Alert";

test('it renders without crashing', () => {
  render(<Alert />);
});

test('it matches snapshot for danger', () => {
  let messages = ["NOOOOOOOO", "Why did you do that?????"];
  const { asFragment } = render(<Alert type="danger" messages={messages} />);
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot for warning', () => {
  let messages = ["Uh-oh..."];
  const { asFragment } = render(<Alert type="warning" messages={messages} />);
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot for success', () => {
  let messages = ["You did it!", "You have an incredible work ethic!"];
  const { asFragment } = render(<Alert type="success" messages={messages} />);
  expect(asFragment()).toMatchSnapshot();
});

test('it matches snapshot for link', () => {
  let messages = ["Go home!"];
  const { asFragment } = render(<Alert messages={messages} link='/' />);
  expect(asFragment()).toMatchSnapshot();
});