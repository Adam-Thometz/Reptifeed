import React, { useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReptifeedApi from "../api";
import { foodQueue, treatQueue } from "../utils/foodQueue";
import UserContext from "../utils/UserContext";
import { getFoodFromPantry, getTreatFromPantry } from "../utils/feedingFunctions";
import Meal from "./Meal";

const Reptile = () => {
  const { reptiles, setReptiles, pantry } = useContext(UserContext)
  const { id, reptileId } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState([])

  const reptile = reptiles.filter(r => r.id === +reptileId)[0];

  const handleFeed = () => {
    const freq = foodQueue.dequeue();
    const protein = getFoodFromPantry(pantry, freq, "protein");
    const vegetable = getFoodFromPantry(pantry, freq, "vegetable");
    foodQueue.enqueue(freq);
    setMeal([protein, vegetable]);
  }

  const handleTreat = () => {
    const freq = treatQueue.dequeue();
    const treat = getTreatFromPantry(pantry, freq);
    treatQueue.enqueue(freq);
    setMeal([treat]);
  }

  const handleDelete = async () => {
    await ReptifeedApi.deleteReptile(+reptileId)
    navigate(`/users/${+id}/reptiles`);
    setReptiles(r => r.filter(reptile => reptile.id !== +reptileId));
  };

  return (
    <div className="Reptile">
      <h1>{reptile.name}</h1>
      <img src={reptile.imgUrl} alt={reptile.name} />
      <h4>Species: {reptile.species}</h4>
      <h4>Subspecies: {reptile.subspecies}</h4>
      <h5>Born on {reptile.birthday}</h5>
      
      <div className="Reptile-options">
        <Link to={`/users/${+id}/reptiles/${+reptileId}/edit`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>

      <button onClick={handleFeed}>Feed</button>
      <button onClick={handleTreat}>Give a treat</button>

      {meal.length ? <Meal meal={meal} /> : null}
    </div>
  );
};

export default Reptile;