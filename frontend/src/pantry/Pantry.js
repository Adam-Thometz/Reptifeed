import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../utils/UserContext";
import ReptifeedApi from "../api";
import PantryCard from "./PantryCard";
import './Pantry.css'

const Pantry = () => {
  const { currUser, pantry, setPantry } = useContext(UserContext);
  const { id } = useParams();
  const [userPantry, setUserPantry] = useState(pantry);

  useEffect(() => {
    async function getUserInfo() {
      if (currUser.isAdmin && currUser.id !== +id) {
        const targetPantry = await ReptifeedApi.getPantry(+id)
        setUserPantry(targetPantry);
      };
    };
    getUserInfo();
  }, [currUser.id, currUser.isAdmin, id]);

  const handleRemove = async name => {
    await ReptifeedApi.removeFromPantry(id, name)
    if (currUser.id === +id) setPantry(p => p.filter(f => f.name !== name))
    setUserPantry(p => p.filter(f => f.name !== name));
  };

  return (
    <div className="Pantry">
      <div>
        <h1>My Pantry</h1>
        <Link className="Pantry-link" to="/foods">Add foods to pantry</Link>
      </div>
      {userPantry.map((f, i) => (
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