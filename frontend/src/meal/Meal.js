import React from "react";
import MealCard from "./MealCard";
import './Meal.css'

const Meal = ({ meal, freq }) => {
  return (
    <div tabIndex={0} className="Meal">
      <div className="Meal-wrapper">
        {meal.map(food => (
          <MealCard
          key={food.name}
          name={food.name}
          type={food.type}
          image={food.image}
          />
          ))}
      </div>
      <h4>Feed {meal.length === 1 ? 'this' : 'these'} {freq}</h4>
    </div>
  );
};

export default Meal;