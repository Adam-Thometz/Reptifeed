import React from "react";

const MealCard = ({ name, type, image, isTreat }) => {
  return (
    <div className={`Meal-${isTreat ? 'treat' : type}`}>
      <img src={image} alt={name} />
      <h5>{name}</h5>
    </div>
  );
};

export default MealCard;