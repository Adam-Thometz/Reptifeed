import React from "react";
import ReptileCard from "./ReptileCard";
import { render, UserProvider, reptiles } from '../utils/testUtils';

test('it renders without crashing', () => {
  const { id, name, image, species, ownerId } = reptiles[0]
  render(<UserProvider>
    <ReptileCard id={id} name={name} image={image} species={species} ownerId={ownerId} />
  </UserProvider>);
});

test('it matches snapshot', () => {
  const { id, name, image, species, ownerId } = reptiles[0]
  const { asFragment } = render(
    <UserProvider>
      <ReptileCard id={id} name={name} image={image} species={species} ownerId={ownerId} />
    </UserProvider>);
  expect(asFragment()).toMatchSnapshot();
});