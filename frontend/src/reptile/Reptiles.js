import React, { useContext } from "react";
import UserContext from "../utils/UserContext";
import { Link, useParams } from "react-router-dom";
import ReptileCard from "./ReptileCard";

const Reptiles = () => {
  const { reptiles } = useContext(UserContext);
  const { id } = useParams();

  return (
    <div className="Reptiles">
      <h1>My Reptiles</h1>
      {!reptiles.length ? (
        <h4>You don't have any reptiles. <Link to={`/users/${+id}/reptiles/add`}>Click here to add one</Link></h4>
      ) : reptiles.map(r => (
        <ReptileCard
          key={r.id}
          id={r.id}
          name={r.name}
          image={r.imgUrl}
          species={r.species}
          ownerId={r.ownerId}
        />
      ))}
    </div>
  );
};

export default Reptiles;