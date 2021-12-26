import React from "react";
import MealCard from "./MealCard";

const Meal = ({ meal }) => {
  return (
    <div className="Meal">
      {meal.map(food => (
        <MealCard
          name={food.name}
          type={food.type}
          image={food.image}
          isTreat={food.isTreat}
        />
      ))}
    </div>
  );
};

export default Meal;