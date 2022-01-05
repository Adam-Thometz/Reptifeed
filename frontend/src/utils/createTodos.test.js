import { createTodos } from './createTodos';
import { reptiles } from './testUtils';

const arugula = {
  name: 'arugula',
  type: 'vegetable',
  frequency: 'often',
  image: 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/arugula_small.gif',
  isTreat: false,
  tips: ''
}

const bokChoy = {
  name: 'bok choy',
  type: 'vegetable',
  frequency: 'moderately',
  image: 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/bokchoy_small.gif',
  isTreat: false,
  tips: ''
}

const broccoli = {
  name: 'broccoli',
  type: 'vegetable',
  frequency: 'occasionally',
  image: 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/broccoli_small.jpg',
  isTreat: false,
  tips: ''
}

describe('createTodos', () => {
  test('it should return todos based on lack of reptiles', () => {
    const todos = createTodos([], [arugula, bokChoy])
    expect(todos.essentialTodos).toContain('Add a reptile');
    expect(todos.essentialTodos.length).toBe(4);
    expect(todos.niceToHaveTodos.length).toBe(4);
  });

  test('it should return todos with a reptile', () => {
    const todos = createTodos(reptiles, [arugula, bokChoy, broccoli])
    console.log(todos)
    expect(todos.essentialTodos).not.toContain('Add a reptile');
    expect(todos.essentialTodos.length).toBe(3);
    expect(todos.niceToHaveTodos.length).toBe(3);
  });

  test('it should return todos for a new user', () => {
    const todos = createTodos([], []);
    expect(todos.essentialTodos.length).toBe(5);
    expect(todos.niceToHaveTodos.length).toBe(5);
  });
});