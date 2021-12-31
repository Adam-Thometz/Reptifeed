import React from "react";
import './FoodOptions.css'

const FoodOptions = ({species, setSpecies, searchTerm, setSearchTerm, foodFilter, setFoodFilter, treatFilter, setTreatFilter}) => {
  const handleChangeSpecies = e => {
    setSpecies(e.target.value)
  };

  const handleChangeSearch = e => {
    setSearchTerm(e.target.value);
  }
  
  const handleChangeType = e => {
    setFoodFilter(e.target.value);
  };

  const handleChangeTreat = () => {
    setTreatFilter(treat => !treat);
  };

  return (
    <div className="FoodOptions">
      <h4>Use these options to filter foods</h4>
      <div className="FoodOptions-group">
        <label className="FoodOptions-label" htmlFor="species">Species</label>
        <select
          className="FoodOptions-input"
          id="species"
          name="species"
          value={species}
          onChange={handleChangeSpecies}
        >
          <option value="blue-tongue-skink">Blue Tongue Skink</option>
        </select>
      </div>
      <div className="FoodOptions-group">
        <label className="FoodOptions-label" htmlFor="search">Search foods</label>
        <input
        type="text"
          className="FoodOptions-input"
          id="search"
          name="search"
          value={searchTerm}
          onChange={handleChangeSearch}
        />
      </div>
      <div className="FoodOptions-group">
        <label className="FoodOptions-label" htmlFor="frequency">Food group</label>
        <select
          className="FoodOptions-input"
          id="type"
          name="type"
          value={foodFilter}
          onChange={handleChangeType}
        >
          <option value="">--</option>
          <option value="protein">Protein</option>
          <option value="vegetable">Vegetables/Greens</option>
          <option value="fruit">Fruit</option>
          <option value="supplement">Supplements</option>
        </select>
      </div>
      <div className="FoodOptions-group">
        <label className="FoodOptions-label" htmlFor="treats">Treats</label>
        <input
          className="FoodOptions-checkbox"
          type="checkbox"
          id="treats"
          name="treats"
          value={treatFilter}
          onChange={handleChangeTreat}
        />
      </div>
    </div>
  )
};

export default FoodOptions;