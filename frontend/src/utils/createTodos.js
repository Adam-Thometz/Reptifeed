
/** createTodos(reptiles, pantry)
 * 
 * Takes a user's reptiles and pantry and creates a list of things they need to do to unlock the app's full features
 * 
 * Returns an two arrays of Link components, one of important things and one of nice-to-haves
 */

function createTodos(reptiles, pantry) {
  /** Essential checks:
   * - reptileCheck: Checks if a user has reptiles
   * - vegetableOftenCheck: Checks if a user has a vegetable staple in their pantry
   * - proteinOftenCheck: Checks if a user has a protein staple in their pantry
   * - treatModeratelyCheck: Checks if a user has a treat staple in their pantry
   * - supplementCheck: Checks if a user has at least two different supplements
   */
  const essentialTodos = [];

  const reptileCheck = !!reptiles.length;
  const vegetableOftenCheck = pantry.some(food => food.type === 'vegetable' && food.frequency === 'often');
  const proteinOftenCheck = pantry.some(food => food.type === 'protein' && food.frequency === 'often');
  const treatModeratelyCheck = pantry.some(food => food.isTreat && food.frequency === 'moderately');
  const supplementCheck = (pantry.filter(food => food.type === 'supplement')).length >= 2;

  if (!reptileCheck) essentialTodos.push('Add a reptile');
  if (!vegetableOftenCheck) essentialTodos.push('Add vegetables eaten often');
  if (!proteinOftenCheck) essentialTodos.push('Add protein eaten often');
  if (!treatModeratelyCheck) essentialTodos.push('Add a treat eaten moderately');
  if (!supplementCheck) essentialTodos.push('Add at least two supplements');

  /** Nice-to-have checks:
   * - vegetableModeratelyCheck: Checks if a user has a vegetable that's eaten moderately in their pantry
   * - vegetableOccasionallyCheck: Checks if a user has a vegetable that's eaten occasionally in their pantry
   * - proteinModeratelyCheck: Checks if a user has a protein that's eaten moderately in their pantry
   * - proteinOccasionallyCheck: Checks if a user has a protein that's eaten occasionally in their pantry
   * - treatOccasionallyCheck: Checks if a user has a treat that's eaten rarely in their pantry
   */
  const niceToHaveTodos = [];

  const vegetableModeratelyCheck = pantry.some(food => food.type === 'vegetable' && food.frequency === 'moderately');
  const vegetableOccasionallyCheck = pantry.some(food => food.type === 'vegetable' && food.frequency === 'occasionally' && !food.isTreat);
  const proteinModeratelyCheck = pantry.some(food => food.type === 'protein' && food.frequency === 'moderately');
  const proteinOccasionallyCheck = pantry.some(food => food.type === 'protein' && food.frequency === 'occasionally' && !food.isTreat);
  const treatOccasionallyCheck = pantry.some(food => food.isTreat && food.frequency === 'occasionally');

  if (!vegetableModeratelyCheck) niceToHaveTodos.push('Add a vegetable eaten moderately');
  if (!vegetableOccasionallyCheck) niceToHaveTodos.push('Add a vegetable eaten occasionally');
  if (!proteinModeratelyCheck) niceToHaveTodos.push('Add a protein eaten moderately');
  if (!proteinOccasionallyCheck) niceToHaveTodos.push('Add a protein eaten occasionally');
  if (!treatOccasionallyCheck) niceToHaveTodos.push('Add a treat eaten occasionally');

  return {essentialTodos, niceToHaveTodos};
};

export default createTodos;