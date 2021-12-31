import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../utils/UserContext";
import ReptifeedApi from "../api";
import PantryCard from "./PantryCard";
import './Pantry.css'

const Pantry = () => {
  const { pantry, setPantry } = useContext(UserContext);
  const { id } = useParams();

  const handleRemove = async name => {
    await ReptifeedApi.removeFromPantry(id, name)
    setPantry(p => p.filter(f => f.name !== name));
  };

  return (
    <div className="Pantry">
      <div>
        <h1>My Pantry</h1>
        <Link className="Pantry-link" to="/foods">Add foods to pantry</Link>
      </div>
      {pantry.map((f, i) => (
        <PantryCard
          key={i}
          name={f.name}
          type={f.type}
          frequency={f.frequency}
          image={f.image}
          isTreat={f.isTreat}
          tips={f.tips}
          remove={handleRemove}
        />
      ))}
    </div>
  );
};

export default Pantry;