import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import looking from './imgs/looking.jpeg'
import tortoise from './imgs/tortoise.jpeg';
import beardedDragon from './imgs/bearded-dragon.jpeg';
import blueTongueSkink from './imgs/blue-tongue-skink.png'

const Home = () => {
  const navigate = useNavigate();
  document.title = "Welcome to Reptifeed!";
  return (
    <div className="Home">
      <div className="Home-background"></div>
      <div className="Home-content">
        <h1>Welcome to Reptifeed!</h1>
        <p>Your personal assistant for all things reptile food!</p>
        <div className="Home-content-description">
          <p>You are here because you want what's best for your pet.</p>
          <img src={looking} alt="A bearded dragon perched on a log and looking into the camera with its mouth slightly open" />
        </div>
        <div className="Home-content-description">
          <img src={tortoise} alt="A tortoise about to eat a dandelion" />
          <p>You know that a diverse selection of food is key to good health.</p>
        </div>
        <div className="Home-content-description">
          <p>Keep an inventory of your food with us and we'll help you decide what to feed your reptile.</p>
          <img src={beardedDragon} alt="A bearded dragon about to eat from a bowl of greens and insects" />
        </div>
        <div className="Home-content-description">
          <img src={blueTongueSkink} alt="A blue tongue skink eating dog food and an egg" />
          <p>We'll help you vary your reptile's diet so they can thrive.</p>
        </div>
        <div className="Home-cta">
          <h4>Get started with us!</h4>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
    </div>
  )
};

export default Home;