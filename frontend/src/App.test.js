import React from "react";
import { render } from './utils/testUtils';
import App from "./App";

test('it renders without crashing', () => {
  render(<App />);
});