import React from "react";
import { useNavigate } from "react-router-dom";
import './ReptileCard.css'

const ReptileCard = ({ id, name, image, species, ownerId }) => {
  const navigate = useNavigate();
  return (
    <div className="ReptileCard" onClick={() => navigate(`/users/${ownerId}/reptiles/${id}`)}>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <h5>{species}</h5>
    </div>
  );
};

export default ReptileCard;