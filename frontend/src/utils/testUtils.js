import React from "react";
import UserContext from "./UserContext";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

/** Test user, reptiles, and pantry/food */

const testUser = {
  id: 1,
  username: 'rickSanchez',
  password: 'ilikeMorty',
  email: 'rickman@qmail.com',
  isAdmin: false
};

const testReptile = [
  {
    id: 1,
    name: 'two crows',
    species: 'crows',
    subspecies: 'two of them',
    birthday: '2015-10-29',
    imgUrl: '',
    ownerId: 1
  }
];

const testPantry = [
  {
    name: 'arugula',
    type: 'vegetable',
    frequency: 'often',
    image: 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/arugula_small.gif',
    isTreat: false,
    tips: ''
  }
];

/** UserContext mock
 * 
 * Wrap components in UserProvider in test files if UserContext is used by a component
 */

const UserProvider = ({ children, currUser = testUser, pantry = testPantry, reptiles = testReptile }) => (
  <UserContext.Provider value={{currUser, pantry, reptiles}}>
    {children}
  </UserContext.Provider>
);

/** custom render
 * 
 * wraps component in MemoryRouter. Useful for all components.
 */

const MemoryRouterWithInitialRoutes = ({ children, initialRoutes }) => {
  return (
    <MemoryRouter initialEntries={initialRoutes}>
      {children}
    </MemoryRouter>
  )
}

const MemoryRouterWithInitialRoutesAndUser = ({ children, initialRoutes }) => {
  return (
    <MemoryRouter initialEntries={initialRoutes}>
      {children}
    </MemoryRouter>
  )
}

const customRender = (component, options) => {
  const initialRoutes = (options && options.initialRoutes)
    ? options.initialRoutes
    : ['/'];
  return render(component, { wrapper: (args) =>
    MemoryRouterWithInitialRoutes({
      ...args,
      initialRoutes
    }), ...options
  });
};

// This export command overrides the render function from the testing library so that we may call our custom render function 'render'
export * from '@testing-library/react'

export { 
  UserProvider,
  customRender as render,
  testUser as user,
  testReptile as reptiles,
  testPantry as pantry
};