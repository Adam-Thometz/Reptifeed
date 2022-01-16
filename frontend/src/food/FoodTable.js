import React, { useContext } from "react";
import ReptifeedApi from "../api";
import UserContext from "../utils/UserContext";
import './FoodTable.css'

const FoodTable = ({ foods }) => {
  const { currUser, pantry, setPantry } = useContext(UserContext)

  const isInPantry = name => {
    return pantry.some(f => f.name === name);
  }

  const handleToggle = async food => {
    if (!isInPantry(food.name)) {
      const newFood = await ReptifeedApi.addToPantry(currUser.id, food);
      setPantry(p => [...p, newFood]);
    } else {
      await ReptifeedApi.removeFromPantry(currUser.id, food.name)
      setPantry(p => p.filter(f => f.name !== food.name));
    }
  };

  return (
    <table className="FoodTable">
      <thead className="FoodTable-header">
        <tr tabIndex={0} className="FoodTable-header-cells">
          <td>Image</td>
          <td>Name</td>
          <td>Type</td>
          <td>How often?</td>
          <td>Treat?</td>
          <td>Tips</td>
          <td>Add / Remove</td>
        </tr>
      </thead>
      <tbody className="FoodTable-body">
        {foods.map(f => (
          <tr tabIndex={0} key={f.name} className="FoodTable-body-cells">
            <td><img src={f.image} alt={f.name} /></td>
            <td>{f.name}</td>
            <td>{f.type}</td>
            <td>{f.frequency}</td>
            <td>{f.isTreat ? "Yes" : "No"}</td>
            <td>{f.tips}</td>
            <td><input className="FoodTable-checkbox" type='checkbox' checked={isInPantry(f.name)} onChange={() => handleToggle(f)} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FoodTable;

// {isInPantry(f.name) ? "Food is in pantry" : <button onClick={() => handleUpdate(f)}>Add to Pantry</button>}