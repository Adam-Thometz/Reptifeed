import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './routes-nav/Navbar';
import ReptifeedRoutes from './routes-nav/ReptifeedRoutes';
import UserContext from './utils/UserContext';
import useLocalStorage from './utils/useLocalStorage';
import ReptifeedApi from './api';
import jwt from 'jsonwebtoken';
import { createTodos } from './utils/todoHelpers';
import LoadingSpinner from './common/LoadingSpinner';

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useLocalStorage('reptifeed-token');
  const [reptiles, setReptiles] = useState([]);
  const [pantry, setPantry] = useState([]);
  const [todos, setTodos] = useState(null);
  
  useEffect(() => {
    async function getUserInfo() {
      if (token) {
        try {
          const { id } = jwt.decode(token);
          ReptifeedApi.token = token;
          const user = await ReptifeedApi.getUser(id);
          setCurrUser(user);
          const userReptiles = await ReptifeedApi.getReptilesByOwner(id);
          setReptiles(userReptiles);
          const userPantry = await ReptifeedApi.getPantry(id);
          setPantry(userPantry);
        } catch (e) {
          setCurrUser(null);
          setReptiles([]);
          setPantry([]);
        };
      };
      setInfoLoaded(true);
    };
    setInfoLoaded(false);
    getUserInfo();
  }, [token]);

  useEffect(() => {
    const todos = createTodos(reptiles, pantry);
    setTodos(todos);
  }, [reptiles, pantry]);

  const login = async loginData => {
    try {
      const { id, token } = await ReptifeedApi.login(loginData);
      setToken(token);
      return { success: true, id }
    } catch (errors) {
      return { success: false, errors };
    };
  };

  const register = async registerData => {
    try {
      const { id, token } = await ReptifeedApi.register(registerData);
      setToken(token);
      return { success: true, id };
    } catch (errors) {
      return { success: false, errors };
    };
  };

  const logout = () => {
    setToken(null);
    setCurrUser(null);
  };

  if (!infoLoaded) return <LoadingSpinner />

  return (
    <div className="App">
      <UserContext.Provider value={{ currUser, setCurrUser, reptiles, setReptiles, pantry, setPantry, todos }}>
        <Navbar logout={logout} />
        <ReptifeedRoutes login={login} register={register} />
      </UserContext.Provider>
    </div>
  );
}

export default App;