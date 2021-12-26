/** Feeding functions
 * 
 * Used to get foods from pantry that match frequencies and food type.
*/

function getFoodFromPantry(pantry, freq, type) {
  const availableFood = pantry.filter(food => (!food.isTreat && (food.frequency === freq && food.type === type)));
  if (!availableFood.length) return `Get some more ${type}`
  const selectedIdx = Math.floor(Math.random() * availableFood.length);

  return availableFood[selectedIdx];
};

function getTreatFromPantry(pantry, freq) {
  const availableTreats = pantry.filter(food => food.isTreat && food.frequency === freq);
  if (!availableTreats.length) return "You don't have any treats";
  const selectedIdx = Math.floor(Math.random() * availableTreats.length); 
  
  return availableTreats[selectedIdx];
};

export { getFoodFromPantry, getTreatFromPantry };