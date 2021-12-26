import React, { useContext } from "react";
import ReptifeedApi from "../api";
import UserContext from "../utils/UserContext";

const FoodTable = ({ foods, species }) => {
  const { currUser, pantry, setPantry } = useContext(UserContext)

  const isInPantry = name => {
    return pantry.some(f => f.name === name);
  }

  const handleUpdate = async food => {
    const newFood = await ReptifeedApi.addToPantry(currUser.id, food);
    setPantry(p => [...p, newFood]);
  };

  return (
    <table className="FoodsSearch-table">
      <thead>
        <tr>
          <td> </td>
          <td>Name</td>
          <td>Type</td>
          <td>How often?</td>
          <td>Treat?</td>
          <td>Tips</td>
          <td>Add/Remove</td>
        </tr>
      </thead>
      <tbody>
        {foods.map(f => (
          <tr>
            <td>{f.image}</td>
            <td>{f.name}</td>
            <td>{f.type}</td>
            <td>{f.frequency}</td>
            <td>{f.isTreat ? "Yes" : "No"}</td>
            <td>{f.tips}</td>
            <td>{isInPantry(f.name) ? "Food is in pantry" : <button onClick={() => handleUpdate(f)}>Add to Pantry</button>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FoodTable;