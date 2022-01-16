import React from "react";
import './PantryCard.css'

const PantryCard = ({name, type, frequency, image, isTreat, tips, remove}) => {
  return (
    <div className={`PantryCard ${type}`}>
      <div className="PantryCard-img-wrapper">
        <img src={image} alt={name} />
      </div>
      <h2>{name}</h2>
      <p>Feed {frequency}</p>
      <p>Treat?: {isTreat ? <b>Yes</b> : <span>No</span>}</p>
      <p>Tips: {tips ? tips : 'N/A'}</p>
      <button className="PantryCard-removebtn" onClick={() => remove(name)}>I ran out</button>
    </div>
  );
};

export default PantryCard;