import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { foodStack, treatStack } from "../utils/foodStack";
import UserContext from "../utils/UserContext";
import { getFoodFromPantry, getTreatFromPantry, getNextSupplement } from "../utils/feedingHelpers";
import Meal from "../meal/Meal";
import useLocalStorage from '../utils/useLocalStorage';
import Alert from '../common/Alert';
import { vegetableOftenCheck, proteinOftenCheck, treatModeratelyCheck, supplementCheck } from '../utils/todoHelpers'
import './Reptile.css';

const Reptile = () => {
  const { reptiles, pantry } = useContext(UserContext)
  const { id, reptileId } = useParams();
  const navigate = useNavigate();
  const [hasFood, setHasFood] = useState(false);
  const [hasTreats, setHasTreats] = useState(false);

  const reptile = reptiles.filter(r => r.id === +reptileId)[0];
  document.title = `${reptile.name} | Reptifeed`;

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


  const [meal, setMeal] = useState([]);
  const [messages, setMessages] = useState([])

  const [displayFreq, setDisplayFreq] = useState(null);
  const [foodFreqs, setFoodFreqs] = useLocalStorage(`food-stack-for-${reptile.name}-${reptile.id}`);
  const [treatFreqs, setTreatFreqs] = useLocalStorage(`treat-stack-for-${reptile.name}-${reptile.id}`);
  const [lastSupplement, setLastSupplement] = useLocalStorage(`${reptile.name}'s-last-supplement-${reptile.id}`)

  const handleFeed = () => {
    setMessages([])
    if (!hasFood) {
      setMessages(["You don't have enough food in your pantry.", "Click to see your todos."]);
      setMeal([]);
      return
    }
    const stack = (!foodFreqs || !JSON.parse(foodFreqs).length) ? [...foodStack] : JSON.parse(foodFreqs);
    const freq = stack.pop();
    const protein = getFoodFromPantry(pantry, freq, "protein");
    if (protein.frequency !== freq) setMessages(m => [...m, "Consider getting more protein. Click for suggestions."])
    const vegetable = getFoodFromPantry(pantry, freq, "vegetable");
    if (vegetable.frequency !== freq) setMessages(m => [...m, "Consider getting more vegetables. Click for suggestions."])
    const supplement = getNextSupplement(pantry, lastSupplement);
    setLastSupplement(supplement.name);
    setDisplayFreq(freq);
    setFoodFreqs(JSON.stringify(stack));
    setMeal([protein, vegetable, supplement]);
  };
  
  const handleTreat = () => {
    setMessages([])
    if (!hasTreats) {
      setMessages(["You don't have enough treats in your pantry.", "Click to see your todos."]);
      setMeal([]);
      return
    }
    const stack = (!treatFreqs || !JSON.parse(treatFreqs).length) ? [...treatStack] : JSON.parse(treatFreqs);
    const freq = stack.pop();
    const treat = getTreatFromPantry(pantry, freq);
    if (treat.frequency !== freq) setMessages(["Consider getting more treats. Click for suggestions"])
    setDisplayFreq(freq);
    setTreatFreqs(JSON.stringify(stack));
    setMeal([treat]);
  };

  return (
    <div className="Reptile">
      <div className="Reptile-card" tabIndex={0}>
        <div className="Reptile-card-img-wrapper">
          <img src={reptile.imgUrl} alt={reptile.name} />
        </div>
        <div>
          <div className="Reptile-card-info">
            <h1>{reptile.name}</h1>
            <p>Species: {reptile.species}</p>
            <p>Subspecies: {reptile.subspecies}</p>
            <b>Born on {reptile.birthday}</b>
          </div>
          <button className="edit" onClick={() => navigate(`/users/${+id}/reptiles/${+reptileId}/edit`)}>Edit</button>
        </div>
      </div>
      

      <div className="Reptile-button-wrapper">
        <button className="feed" onClick={handleFeed}>Feed</button>
        <button className="treat" onClick={handleTreat}>Give a treat</button>
      </div>

      {messages.length ? <Alert type={messages[0].slice(0, 8) === 'Consider' ? 'warning' : 'danger'} messages={messages} link={`/users/${+id}/todos`} /> : null}
      {meal.length ? <Meal meal={meal} freq={displayFreq} /> : null}
    </div>
  );
};

export default Reptile;