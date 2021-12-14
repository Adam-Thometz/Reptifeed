CREATE TABLE skink_diet (
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  frequency TEXT NOT NULL,
  image TEXT,
  is_treat BOOLEAN NOT NULL,
  tips TEXT
);

INSERT INTO skink_diet (name, type, frequency, image, is_treat, tips)
VALUES 
-- Proteins
      -- Often
       ('dog food', 'protein', 'often', '', FALSE, ''),
       ('dubia roaches', 'protein', 'often', '', FALSE, ''),
       ('earthworms', 'protein', 'often', '', FALSE, ''),
       ('horn worms', 'protein', 'often', '', FALSE, ''),
       ('silkworms', 'protein', 'often', '', FALSE, ''),
       ('snails', 'protein', 'often', '', FALSE, ''),
      -- Moderately
       ('butterworms', 'protein', 'moderately', '', FALSE, ''),
       ('beef', 'protein', 'moderately', '', FALSE, 'Cook. Do not feed raw'),
       ('chicken', 'protein', 'moderately', '', FALSE, 'Cook. Do not feed raw'),
       ('phoenix worms', 'protein', 'moderately', '', FALSE, ''),
       ('super worms', 'protein', 'moderately', '', FALSE, ''),
      -- Occasionally
       ('wax worms', 'protein', 'moderately', '', FALSE, ''),
       ('cat food', 'protein', 'occasionally', '', FALSE, ''),
       ('mealworms', 'protein', 'occasionally', '', FALSE, ''),
      -- Treats
       ('crickets', 'protein', 'occasionally', '', TRUE, ''),
       ('pinky mouse', 'protein', 'occasionally', '', TRUE, ''),
       ('eggs', 'protein', 'occasionally', '', TRUE, 'Can be eaten raw or boiled.'),
-- Vegetables and greens
      -- Often
       ('arugula', 'vegetable', 'often', '', FALSE, ''),
       ('beet greens', 'vegetable', 'often', '', FALSE, ''),
       ('borage', 'vegetable', 'often', '', FALSE, ''),
       ('cactus', 'vegetable', 'often', '', FALSE, ''),
       ('collard greens', 'vegetable', 'often', '', FALSE, ''),
       ('dandelion greens', 'vegetable', 'often', '', FALSE, ''),
       ('endive', 'vegetable', 'often', '', FALSE, ''),
       ('escarole', 'vegetable', 'often', '', FALSE, ''),
       ('green beans', 'vegetable', 'often', '', FALSE, ''),
       ('mustard greens', 'vegetable', 'often', '', FALSE, ''),
       ('squash', 'vegetable', 'often', '', FALSE, 'Squash is a staple of the skink diet! Use a cheese grater or food processor to prepare'),
       ('turnip greens', 'vegetable', 'often', '', FALSE, ''),
       ('watercress', 'vegetable', 'often', '', FALSE, ''),
      -- Moderately
       ('bok choy', 'vegetable', 'moderately', '', FALSE, ''),
       ('chicory greens', 'vegetable', 'moderately', '', FALSE, ''),
       ('green peas', 'vegetable', 'moderately', '', FALSE, ''),
       ('parsnips', 'vegetable', 'moderately', '', FALSE, ''),
      -- Occasionally
       ('asparagus', 'vegetable', 'occasionally', '', FALSE, ''),
       ('basil', 'vegetable', 'occasionally', '', TRUE, ''), -- The one vegetable that's a treat!!
       ('beets', 'vegetable', 'occasionally', '', FALSE, ''),
       ('broccoli', 'vegetable', 'occasionally', '', FALSE, ''),
       ('brussel sprouts', 'vegetable', 'occasionally', '', FALSE, ''),
       ('carrots', 'vegetable', 'occasionally', '', FALSE, 'Use a cheese grater or food processor to prepare'),
       ('cauliflower', 'vegetable', 'occasionally', '', FALSE, ''),
       ('celery', 'vegetable', 'occasionally', '', FALSE, ''),
       ('cucumber', 'vegetable', 'occasionally', '', FALSE, ''),
       ('okra', 'vegetable', 'occasionally', '', FALSE, ''),
       ('pumpkin', 'vegetable', 'occasionally', '', FALSE, ''),
       ('radicchio', 'vegetable', 'occasionally', '', FALSE, ''),
       ('radish', 'vegetable', 'occasionally', '', FALSE, ''),
       ('rutabega', 'vegetable', 'occasionally', '', FALSE, ''),
       ('turnip', 'vegetable', 'occasionally', '', FALSE, ''),
       ('zucchini', 'vegetable', 'occasionally', '', FALSE, ''),
-- Fruits
      -- Moderately
       ('apples', 'fruit', 'moderately', '', TRUE, ''),
       ('figs', 'fruit', 'moderately', '', TRUE, ''),
       ('mango', 'fruit', 'moderately', '', TRUE, ''),
       ('papaya', 'fruit', 'moderately', '', TRUE, ''),
       ('raspberries', 'fruit', 'moderately', '', TRUE, ''),
      -- Occasionally
       ('apricot', 'fruit', 'occasionally', '', TRUE, ''),
       ('bananas', 'fruit', 'occasionally', '', TRUE, ''),
       ('blackberries', 'fruit', 'occasionally', '', TRUE, ''),
       ('blueberries', 'fruit', 'occasionally', '', TRUE, ''),
       ('cantalope', 'fruit', 'occasionally', '', TRUE, ''),
       ('cherries', 'fruit', 'occasionally', '', TRUE, ''),
       ('cranberries', 'fruit', 'occasionally', '', TRUE, ''),
       ('grapes', 'fruit', 'occasionally', '', TRUE, ''),
       ('guava', 'fruit', 'occasionally', '', TRUE, ''),
       ('honeydew', 'fruit', 'occasionally', '', TRUE, ''),
       ('nectarines', 'fruit', 'occasionally', '', TRUE, ''),
       ('peaches', 'fruit', 'occasionally', '', TRUE, ''),
       ('pineapples', 'fruit', 'occasionally', '', TRUE, ''),
       ('plums', 'fruit', 'occasionally', '', TRUE, ''),
       ('pomegranates', 'fruit', 'occasionally', '', TRUE, ''),
       ('strawberries', 'fruit', 'occasionally', '', TRUE, ''),
       ('watermelon', 'fruit', 'occasionally', '', TRUE, ''),
-- Supplements
       ('calcium', 'supplement', 'often', '', FALSE, ''),
       ('multivitamin', 'supplement', 'often', '', FALSE, '')