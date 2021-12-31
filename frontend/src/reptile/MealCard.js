import React from "react";
import './MealCard.css'

const MealCard = ({ name, type, image }) => {
  return (
    <div className={`MealCard ${type}`}>
      <div className="MealCard-img-wrapper">
        <img src={image} alt={name} />
      </div>
      <h5>{name}</h5>
    </div>
  );
};

export default MealCard;