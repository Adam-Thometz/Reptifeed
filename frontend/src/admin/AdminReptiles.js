import React, { useEffect, useState } from "react";
import ReptifeedApi from "../api";
import ReptileCard from "../reptile/ReptileCard";

const AdminReptiles = () => {
  const [reptiles, setReptiles] = useState([]);

  useEffect(() => {
    async function getReptiles() {
      const res = await ReptifeedApi.getAllReptiles();
      setReptiles(res);
    };
    getReptiles();
  }, []);

  return (
    <div className="AdminReptiles">
      <h1>All reptiles on Reptifeed</h1>
      {reptiles.map(r => (
        <ReptileCard id={r.id} name={r.name} image={r.imgUrl} species={r.species} ownerId={r.ownerId} />
      ))}
    </div>
  );
};

export default AdminReptiles;