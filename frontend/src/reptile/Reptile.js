import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { foodQueue, treatQueue } from "../utils/foodQueue";
import UserContext from "../utils/UserContext";
import { getFoodFromPantry, getTreatFromPantry, getNextSupplement } from "../utils/feedingFunctions";
import Meal from "./Meal";
import useLocalStorage from '../utils/useLocalStorage';
import './Reptile.css';

const Reptile = () => {
  const { reptiles, pantry } = useContext(UserContext)
  const { id, reptileId } = useParams();
  const navigate = useNavigate();

  const reptile = reptiles.filter(r => r.id === +reptileId)[0];

  const [meal, setMeal] = useState([]);
  const [displayFreq, setDisplayFreq] = useState(null);
  const [foodFreqs, setFoodFreqs] = useLocalStorage(`food-queue-for-${reptile.name}-${reptile.id}`);
  const [treatFreqs, setTreatFreqs] = useLocalStorage(`treat-queue-for-${reptile.name}-${reptile.id}`);
  const [lastSupplement, setLastSupplement] = useLocalStorage(`${reptile.name}'s-last-supplement-${reptile.id}`)

  const handleFeed = () => {
    const queue = (!foodFreqs || !JSON.parse(foodFreqs).length) ? [...foodQueue] : JSON.parse(foodFreqs);
    const freq = queue.shift();
    const protein = getFoodFromPantry(pantry, freq, "protein");
    const vegetable = getFoodFromPantry(pantry, freq, "vegetable");
    const supplement = getNextSupplement(pantry, lastSupplement);
    setLastSupplement(supplement.name);
    setDisplayFreq(freq);
    setFoodFreqs(JSON.stringify(queue));
    setMeal([protein, vegetable, supplement]);
  };
  
  const handleTreat = () => {
    const queue = (!treatFreqs || !JSON.parse(treatFreqs).length) ? [...treatQueue] : JSON.parse(treatFreqs);
    const freq = queue.shift();
    const treat = getTreatFromPantry(pantry, freq);
    setDisplayFreq(freq);
    setTreatFreqs(JSON.stringify(queue));
    setMeal([treat]);
  };

  return (
    <div className="Reptile">
      <div className="Reptile-card">
        <div className="Reptile-card-img-wrapper">
          <img src={reptile.imgUrl} alt={reptile.name} />
        </div>
        <div>
          <div className="Reptile-card-info">
            <h1>{reptile.name}</h1>
            <h4>Species: {reptile.species}</h4>
            <h4>Subspecies: {reptile.subspecies}</h4>
            <h5>Born on {reptile.birthday}</h5>
          </div>
          <button className="edit" onClick={() => navigate(`/users/${+id}/reptiles/${+reptileId}/edit`)}>Edit</button>
        </div>
      </div>
      

      <div className="Reptile-button-wrapper">
        <button className="feed" onClick={handleFeed}>Feed</button>
        <button className="treat" onClick={handleTreat}>Give a treat</button>
      </div>

      {meal.length ? <Meal meal={meal} freq={displayFreq} /> : null}
    </div>
  );
};

export default Reptile;