import React, { useContext, useEffect, useState } from "react";
import ReptifeedApi from "../api";
import UserContext from "../utils/UserContext";
import FoodOptions from "./FoodOptions";
import FoodTable from "./FoodTable";
import Unauthorized from "../common/Unauthorized";

const Foods = () => {
  const { currUser } = useContext(UserContext);

  const [foods, setFoods] = useState([]);
  const [species, setSpecies] = useState('blue-tongue-skink');
  const [searchTerm, setSearchTerm] = useState('');
  const [foodFilter, setFoodFilter] = useState('');
  const [treatFilter, setTreatFilter] = useState(false)

  useEffect(() => {
    async function getFoodsForSpecies() {
      const foodRes = await ReptifeedApi.getFoodsBySpecies(species, searchTerm);
      setFoods(foodRes);
    }
    getFoodsForSpecies();
  }, [species, searchTerm]);

  useEffect(() => {
    async function getFoodsByFoodType() {
      let foodRes;
      if (foodFilter) {
        foodRes = await ReptifeedApi.getFoodByType(species, foodFilter);
      } else {
        foodRes = await ReptifeedApi.getFoodsBySpecies(species, searchTerm);
      };
      setFoods(foodRes);
    };
    getFoodsByFoodType();
  }, [searchTerm, species, foodFilter]);

  useEffect(() => {
    async function getTreats() {
      let foodRes;
      if (treatFilter) {
        foodRes = await ReptifeedApi.getTreats(species);
      } else {
        foodRes = await ReptifeedApi.getFoodsBySpecies(species, searchTerm)
      };
      setFoods(foodRes);
    };
    getTreats();
  }, [searchTerm, species, treatFilter]);

  if (!currUser) return (<Unauthorized />);

  return (
    <div className="Foods">
      <h1>Food for your reptiles!</h1>
      <FoodOptions
        species={species}
        setSpecies={setSpecies}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        foodFilter={foodFilter}
        setFoodFilter={setFoodFilter}
        treatFilter={treatFilter}
        setTreatFilter={setTreatFilter}
      />
      <h6>Pick foods you have or can easily get.</h6>
      <h6>The more foods you pick, the better the variety we can provide for you.</h6>
      <FoodTable
        species={species}
        foods={foods}
      />
    </div>
  );
};

export default Foods;