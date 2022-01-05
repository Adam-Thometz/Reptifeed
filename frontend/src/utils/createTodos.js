/** createTodos(reptiles, pantry)
 * 
 * Takes a user's reptiles and pantry and creates a list of things they need to do to unlock the app's full features
 * 
 * Returns an two arrays of Link components, one of important things and one of nice-to-haves
 */

// The following functions are used individually and are/can be exported as such:
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

const vegetableModeratelyCheck = pantry => {
  return pantry.some(food => food.type === 'vegetable' && food.frequency === 'moderately');
}
const vegetableOccasionallyCheck = pantry => {
  return pantry.some(food => food.type === 'vegetable' && food.frequency === 'occasionally' && !food.isTreat);
}
const proteinModeratelyCheck = pantry => {
  return pantry.some(food => food.type === 'protein' && food.frequency === 'moderately');
}
const proteinOccasionallyCheck = pantry => {
  return pantry.some(food => food.type === 'protein' && food.frequency === 'occasionally' && !food.isTreat);
}
const treatOccasionallyCheck = pantry => {
  return pantry.some(food => food.isTreat && food.frequency === 'occasionally');
}

function createTodos(reptiles, pantry) {
  const essentialTodos = [];

  if (!reptiles.length) essentialTodos.push('Add a reptile');
  if (!vegetableOftenCheck(pantry)) essentialTodos.push('Add vegetables eaten often');
  if (!proteinOftenCheck(pantry)) essentialTodos.push('Add protein eaten often');
  if (!treatModeratelyCheck(pantry)) essentialTodos.push('Add a treat eaten moderately');
  if (!supplementCheck(pantry)) essentialTodos.push('Add at least two supplements');

  /** Nice-to-have checks:
   * - vegetableModeratelyCheck: Checks if a user has a vegetable that's eaten moderately in their pantry
   * - vegetableOccasionallyCheck: Checks if a user has a vegetable that's eaten occasionally in their pantry
   * - proteinModeratelyCheck: Checks if a user has a protein that's eaten moderately in their pantry
   * - proteinOccasionallyCheck: Checks if a user has a protein that's eaten occasionally in their pantry
   * - treatOccasionallyCheck: Checks if a user has a treat that's eaten rarely in their pantry
   */
  const niceToHaveTodos = [];

  if (!vegetableModeratelyCheck(pantry)) niceToHaveTodos.push('Add a vegetable eaten moderately');
  if (!vegetableOccasionallyCheck(pantry)) niceToHaveTodos.push('Add a vegetable eaten occasionally');
  if (!proteinModeratelyCheck(pantry)) niceToHaveTodos.push('Add a protein eaten moderately');
  if (!proteinOccasionallyCheck(pantry)) niceToHaveTodos.push('Add a protein eaten occasionally');
  if (!treatOccasionallyCheck(pantry)) niceToHaveTodos.push('Add a treat eaten occasionally');

  return {essentialTodos, niceToHaveTodos};
};

export {createTodos, vegetableOftenCheck, proteinOftenCheck, treatModeratelyCheck, supplementCheck };