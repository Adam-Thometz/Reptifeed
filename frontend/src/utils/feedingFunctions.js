/** Feeding functions
 * 
 * Used to get foods from pantry that match frequencies and food type.
 * 
 * If no foods are available for the frequency, returns foods eaten most often
*/

function getFoodFromPantry(pantry, freq, type) {
  let availableFood = pantry.filter(food => (!food.isTreat && (food.frequency === freq && food.type === type)));
  if (!availableFood.length) {
    availableFood = pantry.filter(food => (!food.isTreat && (food.frequency === 'often' && food.type === type)));
  };
  const selectedIdx = Math.floor(Math.random() * availableFood.length);

  return availableFood[selectedIdx];
};

function getTreatFromPantry(pantry, freq) {
  let availableTreats = pantry.filter(food => food.isTreat && food.frequency === freq);
  if (!availableTreats.length) {
    availableTreats = pantry.filter(food => food.isTreat);
  };
  const selectedIdx = Math.floor(Math.random() * availableTreats.length); 
  
  return availableTreats[selectedIdx];
};

function getNextSupplement(pantry, lastSupplement) {
  const nextSupplement = lastSupplement === 'calcium' ?
    pantry.find(food => food.name === 'multivitamin') :
    pantry.find(food => food.name === 'calcium');
  
  return nextSupplement;
}

export { getFoodFromPantry, getTreatFromPantry, getNextSupplement };