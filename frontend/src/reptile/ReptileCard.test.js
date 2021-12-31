import React from "react";
import ReptileCard from "./ReptileCard";
import { render, UserProvider, reptiles } from '../utils/testUtils';
import RequireAuth from "../routes-nav/RequireAuth";
import { Routes, Route } from 'react-router-dom';


test('it renders without crashing', () => {
  const { id, name, image, species, ownerId } = reptiles[0]
  render(<UserProvider>
    <Routes>
      <Route path='/users/:id/reptiles' element={<RequireAuth><ReptileCard id={id} name={name} image={image} species={species} ownerId={ownerId} /></RequireAuth>} />
    </Routes>
  </UserProvider>, { initialRoutes: ['/users/1/reptiles'] });
});

test('it matches snapshot', () => {
  const { id, name, image, species, ownerId } = reptiles[0]
  const { asFragment } = render(
    <UserProvider>
      <Routes>
        <Route path='/users/:id/reptiles' element={<RequireAuth><ReptileCard id={id} name={name} image={image} species={species} ownerId={ownerId} /></RequireAuth>} />
      </Routes>
    </UserProvider>, { initialRoutes: ['/users/1/reptiles'] });
  expect(asFragment()).toMatchSnapshot();
});