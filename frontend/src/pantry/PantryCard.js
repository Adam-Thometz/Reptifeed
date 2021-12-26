import React from "react";

const PantryCard = ({name, type, frequency, image, isTreat, tips, remove}) => {
  return (
    <div className={`Pantry-card-${type}`}>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Feed {frequency}</p>
      {isTreat ? "Give as a treat!" : null}
      {tips ? `Helpful tip: ${tips}` : null}
      <button className="Pantry-card-removebtn" onClick={() => remove(name)}>I ran out</button>
    </div>
  );
};

export default PantryCard;