import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { foodStack, treatStack } from "../utils/foodStack";
import UserContext from "../utils/UserContext";
import { getFoodFromPantry, getTreatFromPantry, getNextSupplement } from "../utils/feedingFunctions";
import Meal from "./Meal";
import useLocalStorage from '../utils/useLocalStorage';
import Alert from '../common/Alert';
import { vegetableOftenCheck, proteinOftenCheck, treatModeratelyCheck, supplementCheck } from '../utils/createTodos'
import './Reptile.css';

const Reptile = () => {
  const { reptiles, pantry } = useContext(UserContext)
  const { id, reptileId } = useParams();
  const navigate = useNavigate();
  const [hasFood, setHasFood] = useState(false);
  const [hasTreats, setHasTreats] = useState(false);

  useEffect(() => {
    function checkPantry() {
      const hasProtein = proteinOftenCheck(pantry);
      const hasVegetable = vegetableOftenCheck(pantry);
      const hasSupplements = supplementCheck(pantry);
      return hasProtein && hasVegetable && hasSupplements;
    }
    function checkTreats() {
      return treatModeratelyCheck(pantry);
    }
    setHasFood(checkPantry());
    setHasTreats(checkTreats());
  }, [pantry]);

  const reptile = reptiles.filter(r => r.id === +reptileId)[0];

  const [meal, setMeal] = useState([]);
  const [messages, setMessages] = useState([])

  const [displayFreq, setDisplayFreq] = useState(null);
  const [foodFreqs, setFoodFreqs] = useLocalStorage(`food-stack-for-${reptile.name}-${reptile.id}`);
  const [treatFreqs, setTreatFreqs] = useLocalStorage(`treat-stack-for-${reptile.name}-${reptile.id}`);
  const [lastSupplement, setLastSupplement] = useLocalStorage(`${reptile.name}'s-last-supplement-${reptile.id}`)

  const handleFeed = () => {
    if (!hasFood) {
      setMessages(["You don't have enough food in your pantry. See your account for more information"]);
      setMeal([]);
      return
    }
    const stack = (!foodFreqs || !JSON.parse(foodFreqs).length) ? [...foodStack] : JSON.parse(foodFreqs);
    const freq = stack.pop();
    const protein = getFoodFromPantry(pantry, freq, "protein");
    const vegetable = getFoodFromPantry(pantry, freq, "vegetable");
    const supplement = getNextSupplement(pantry, lastSupplement);
    setLastSupplement(supplement.name);
    setDisplayFreq(freq);
    setFoodFreqs(JSON.stringify(stack));
    setMeal([protein, vegetable, supplement]);
  };
  
  const handleTreat = () => {
    if (!hasTreats) {
      setMessages(["You don't have enough food in your pantry. See your account for more information"]);
      setMeal([]);
      return
    }
    const stack = (!treatFreqs || !JSON.parse(treatFreqs).length) ? [...treatStack] : JSON.parse(treatFreqs);
    const freq = stack.pop();
    const treat = getTreatFromPantry(pantry, freq);
    setDisplayFreq(freq);
    setTreatFreqs(JSON.stringify(stack));
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

      {messages.length ? <Alert messages={messages} link={`/users/${+id}`} /> : null}
      {meal.length ? <Meal meal={meal} freq={displayFreq} /> : null}
    </div>
  );
};

export default Reptile;