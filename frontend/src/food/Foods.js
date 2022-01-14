import React, { useEffect, useState } from "react";
import ReptifeedApi from "../api";
import FoodOptions from "./FoodOptions";
import FoodTable from "./FoodTable";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [species, setSpecies] = useState('blue-tongue-skink');
  const [searchTerm, setSearchTerm] = useState('');
  const [foodFilter, setFoodFilter] = useState('');
  const [treatFilter, setTreatFilter] = useState(false)

  document.title = `Food Page | Reptifeed account`;

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

  return (
    <div className="Foods">
      <h1>Food for your reptiles!</h1>
      <h5>Pick foods you have or can easily get. We recommend having a large variety of foods to ensure a balanced diet.</h5>
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
      <FoodTable
        species={species}
        foods={foods}
      />
    </div>
  );
};

export default Foods;