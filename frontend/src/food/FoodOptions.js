import React from "react";

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
    <div className="FoodsOptions">
      <div className="FoodOptions-species">
        <label htmlFor="species">Pick your species</label>
        <select
          id="species"
          name="species"
          value={species}
          onChange={handleChangeSpecies}
        >
          <option value="blue-tongue-skink">Blue Tongue Skink</option>
        </select>
      </div>
      <div className="FoodOptions-search">
        <label htmlFor="search">Search foods</label>
        <input
          id="search"
          name="search"
          value={searchTerm}
          onChange={handleChangeSearch}
        />
      </div>
      <div className="FoodOptions-type">
        <label htmlFor="frequency">Select a food group</label>
        <select
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
      <div className="FoodOptions-treats">
        <label htmlFor="treats">Show treats?</label>
        <input
          type="checkbox"
          id="treats"
          name="treats"
          value={treatFilter}
          onChange={handleChangeTreat}
        />
      </div>
      {/* TODO: 
        - search feature
      */}
    </div>
  )
};

export default FoodOptions;