import React, { useContext } from "react";
import UserContext from "../utils/UserContext";
import { Link, useParams } from "react-router-dom";
import ReptileCard from "./ReptileCard";

const Reptiles = () => {
  const { reptiles } = useContext(UserContext);
  const { id } = useParams();

  document.title = `My Reptiles | Reptifeed`

  return (
    <div className="Reptiles">
      <h1>My Reptiles</h1>
      <p>Click on a reptile to feed them.</p>
      {!reptiles.length ? (
        <h2>You don't have any reptiles. <Link to={`/users/${+id}/reptiles/add`}>Click here to add one</Link></h2>
      ) : reptiles.map(r => (
        <ReptileCard
          key={r.id}
          id={r.id}
          name={r.name}
          image={r.imgUrl}
          species={r.species}
          ownerId={r.ownerId}
          link
        />
      ))}
    </div>
  );
};

export default Reptiles;