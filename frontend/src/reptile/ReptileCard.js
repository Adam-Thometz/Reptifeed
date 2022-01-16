import React from "react";
import { useNavigate } from "react-router-dom";
import './ReptileCard.css'

const ReptileCard = ({ id, name, image, species, ownerId, link = false }) => {
  const navigate = useNavigate();
  return (
    <div tabIndex={0} className="ReptileCard">
      <h2>{name}</h2>
      <img src={image} alt={name} />
      <p>{species}</p>
      {link ? <button onClick={() => navigate(`/users/${ownerId}/reptiles/${id}`)}>Go to reptile</button> : null}

    </div>
  );
};

export default ReptileCard;