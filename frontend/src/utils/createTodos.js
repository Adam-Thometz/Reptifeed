/** createTodos(reptiles, pantry)
 * 
 * Takes a user's reptiles and pantry and creates a list of things they need to do to unlock the app's full features
 * 
 * Returns an two arrays of Link components, one of important things and one of nice-to-haves
 */

// The following functions are used individually in createTodos and are/can be exported as such:
const vegetableOftenCheck = pantry => {
  return pantry.some(food => food.type === 'vegetable' && food.frequency === 'often');
};
const proteinOftenCheck = pantry => {
  return pantry.some(food => food.type === 'protein' && food.frequency === 'often');
};
const treatModeratelyCheck = pantry => {
  return pantry.some(food => food.isTreat && food.frequency === 'moderately');
};
const supplementCheck = pantry => {
  return (pantry.filter(food => food.type === 'supplement')).length >= 2;
};

// Helper for createTodos function; frequency counter so that the pantry is looped over only once.
const makePantryInventory = pantry => {
  const inv = {}

  for (let food of pantry) {
    if (food.isTreat) {
      if (food.frequency === 'moderately') inv.hasTreatModerately = true;
      if (food.frequency === 'occasionally') inv.hasTreatOccasionally = true;
    } else if (!food.isTreat && food.type === 'protein') {
      if (food.frequency === 'often') inv.hasProteinOften = true;
      if (food.frequency === 'moderately') inv.hasProteinModerately = true;
      if (food.frequency === 'occasionally') inv.hasProteinOccasionally = true;
    } else if (!food.isTreat && food.type === 'vegetable') {
      if (food.frequency === 'often') inv.hasVegetableOften = true;
      if (food.frequency === 'moderately') inv.hasVegetableModerately = true;
      if (food.frequency === 'occasionally') inv.hasVegetableOccasionally = true;
    } else if (food.type === 'supplement') {
      inv.supplementCounter ?
        inv.supplementCounter = inv.supplementCounter + 1 :
        inv.supplementCounter = 1;
    };
  };

  return inv;
};

function createTodos(reptiles, pantry) {
  const pantryInventory = makePantryInventory(pantry);
  const essentialTodos = [];

  if (!reptiles.length) essentialTodos.push('Add a reptile');
  if (!pantryInventory.hasVegetableOften) essentialTodos.push('Add vegetables eaten often');
  if (!pantryInventory.hasProteinOften) essentialTodos.push('Add protein eaten often');
  if (!pantryInventory.hasTreatModerately) essentialTodos.push('Add a treat eaten moderately');
  if (!pantryInventory.supplementCounter || !pantryInventory.supplementCounter >= 2) essentialTodos.push('Add at least two supplements');

  const niceToHaveTodos = [];

  if (!pantryInventory.hasVegetableModerately) niceToHaveTodos.push('Add a vegetable eaten moderately');
  if (!pantryInventory.hasVegetableOccasionally) niceToHaveTodos.push('Add a vegetable eaten occasionally');
  if (!pantryInventory.hasProteinModerately) niceToHaveTodos.push('Add a protein eaten moderately');
  if (!pantryInventory.hasProteinOccasionally) niceToHaveTodos.push('Add a protein eaten occasionally');
  if (!pantryInventory.hasTreatOccasionally) niceToHaveTodos.push('Add a treat eaten occasionally');

  return {essentialTodos, niceToHaveTodos};
};

export {createTodos, vegetableOftenCheck, proteinOftenCheck, treatModeratelyCheck, supplementCheck };