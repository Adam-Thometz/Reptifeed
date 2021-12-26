import React from "react";
import UserContext from "./UserContext";

const demoUser = {
  id: 1,
  username: 'rickSanchez',
  password: 'ilikeMorty',
  email: 'rickman@qmail.com',
  isAdmin: false
};

const demoReptile = [
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

const demoPantry = [
  {
    name: 'plumbus',
    type: 'everything',
    frequency: 'always',
    image: '',
    isTreat: true,
    tips: "Everyone needs a plumbus!"
  }
];

const UserProvider = ({ children, currUser = demoUser, pantry = demoPantry, reptiles = demoReptile }) => (
  <UserContext.Provider value={{currUser, pantry, reptiles}}>
    {children}
  </UserContext.Provider>
);

export { UserProvider };