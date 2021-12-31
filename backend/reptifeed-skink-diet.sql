CREATE TABLE blue_tongue_skink_diet (
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  frequency TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT 'https://previews.123rf.com/images/urfandadashov/urfandadashov1805/urfandadashov180500070/100957966-photo-not-available-icon-isolated-on-white-background-vector-illustration.jpg',
  is_treat BOOLEAN NOT NULL,
  tips TEXT
);

INSERT INTO blue_tongue_skink_diet (name, type, frequency, image, is_treat, tips)
VALUES 
-- Vegetables and greens
  -- Often
    ('arugula', 'vegetable', 'often', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/arugula_small.gif', FALSE, ''),
    ('beet greens', 'vegetable', 'often', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/beets_small.gif', FALSE, ''),
    ('cactus', 'vegetable', 'often', 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/2311591/5ab686083ea474ccd5e332dd39df9a79_large.png&width=256&type=webp&quality=80', FALSE, ''),
    ('collard greens', 'vegetable', 'often', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/collards_small.gif', FALSE, ''),
    ('dandelion greens', 'vegetable', 'often', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/dandeliongreens_small.gif', FALSE, ''),
    ('endive', 'vegetable', 'often', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/belgianendive_small.gif', FALSE, ''),
    ('escarole', 'vegetable', 'often', 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/12516/c95b45abb5d129c7ce012d793d8b711e_large.png&width=256&type=webp&quality=80', FALSE, ''),
    ('green beans', 'vegetable', 'often', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/greenbeans_small.gif', FALSE, ''),
    ('mustard greens', 'vegetable', 'often', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/mustardgreens_small.gif', FALSE, ''),
    ('squash', 'vegetable', 'often', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/squash_small.jpg', FALSE, 'Use a cheese grater or food processor to prepare'),
    ('turnip greens', 'vegetable', 'often', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/turnip_small.gif', FALSE, ''),
    ('watercress', 'vegetable', 'often', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/watercress_small.jpg', FALSE, ''),
  -- Moderately
    ('bok choy', 'vegetable', 'moderately', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/bokchoy_small.gif', FALSE, ''),
    ('chicory greens', 'vegetable', 'moderately', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/chicory_small.gif', FALSE, ''),
    ('green peas', 'vegetable', 'moderately', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/peas_small.gif', FALSE, ''),
    ('parsnips', 'vegetable', 'moderately', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/parsnip_small.gif', FALSE, ''),
  -- Occasionally
    ('asparagus', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/asparagus_small.jpg', FALSE, ''),
    ('basil', 'vegetable', 'occasionally', 'https://images.squarespace-cdn.com/content/v1/531a3fede4b035ad0339f892/1443739109032-HY66ECPJIHGMP5B6XBTX/Boone+Olive+Oil+CO.+Basil+Olive+Oil.jpg?format=1000w', TRUE, ''), -- The one vegetable that's a treat!!
    ('beets', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/beets_small.gif', FALSE, ''),
    ('broccoli', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/broccoli_small.jpg', FALSE, ''),
    ('brussel sprouts', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/brusselssprouts_small.jpg', FALSE, ''),
    ('carrots', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/carrots_small.jpg', FALSE, 'Use a cheese grater or food processor to prepare'),
    ('cauliflower', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/cauliflower_small.jpg', FALSE, ''),
    ('celery', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/celery_small.jpg', FALSE, ''),
    ('cucumber', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/cucumber_small.jpg', FALSE, ''),
    ('kale', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/kale_small.gif', FALSE, ''),
    ('okra', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/okra_small.gif', FALSE, ''),
    ('pumpkin', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/pumpkin_small.jpg', FALSE, ''),
    ('radicchio', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/radicchio_small.gif', FALSE, ''),
    ('radish', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/radish_small.gif', FALSE, ''),
    ('rutabega', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/rutabaga_small.jpg', FALSE, ''),
    ('turnip', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/turnip_small.gif', FALSE, ''),
    ('zucchini', 'vegetable', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/zucchini_small.gif', FALSE, ''),
-- Fruits
  -- Moderately
    ('apples', 'fruit', 'moderately', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/apple_small.gif', TRUE, ''),
    ('figs', 'fruit', 'moderately', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/fig_small.gif', TRUE, ''),
    ('mangos', 'fruit', 'moderately', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/mango_small.gif', TRUE, ''),
    ('papaya', 'fruit', 'moderately', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/papaya_small.gif', TRUE, ''),
    ('raspberries', 'fruit', 'moderately', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/raspberries_small.gif', TRUE, ''),
  -- Occasionally
    ('apricot', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/apricot_small.jpg', TRUE, ''),
    ('bananas', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/banana_small.gif', TRUE, ''),
    ('blackberries', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2019/03/BlackberrySmall-300x300.jpg', TRUE, ''),
    ('blueberries', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/blueberries_small.jpg', TRUE, ''),
    ('cantalope', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/cantaloupe_small.gif', TRUE, ''),
    ('cherries', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/cherries_small.jpg', TRUE, ''),
    ('cranberries', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2017/03/Cranberriesforwebsite1-300x300.jpg', TRUE, ''),
    ('grapes', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/grapes_small.jpg', TRUE, ''),
    ('guava', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/guava_small.jpg', TRUE, ''),
    ('honeydew', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/honeydewmelon_small.gif', TRUE, ''),
    ('nectarines', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/nectarine_small.gif', TRUE, ''),
    ('peaches', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/peach_small.jpg', TRUE, ''),
    ('pineapples', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/pineapple_small.jpg', TRUE, ''),
    ('plums', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/plums_small.jpg', TRUE, ''),
    ('pomegranates', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/pomegranate_small.jpg', TRUE, ''),
    ('strawberries', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/strawberries_small-e1426772485578.gif', TRUE, ''),
    ('watermelon', 'fruit', 'occasionally', 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/watermelon_small.gif', TRUE, ''),
-- Proteins
  -- Often
    ('dog food', 'protein', 'often', 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00036800086821/3b0b51456eaf177a3679cee48f7d6314_large.png&width=200&type=webp&quality=80', FALSE, ''),
    ('dubia roaches', 'protein', 'often', 'https://cdn.shopify.com/s/files/1/1033/5251/products/canned_dubia_roaches_1024x1024.jpg?v=1607104879', FALSE, ''),
    ('earthworms', 'protein', 'often', 'https://m.media-amazon.com/images/I/61rpMLLI09S._AC_SX679_.jpg', FALSE, ''),
    ('horn worms', 'protein', 'often', '', FALSE, ''),
    ('silkworms', 'protein', 'often', 'https://m.media-amazon.com/images/I/51h--2NQmGS._AC_SX679_.jpg', FALSE, ''),
    ('snails', 'protein', 'often', 'https://img.chewy.com/is/catalog/98228._AC_SL1500_V1456923061_.jpg', FALSE, ''),
    ('black soldier fly larvae', 'protein', 'often', 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ9Bd-Jf3MZI3IkOWh2L6zkNlG4sNJkh7isCMusBFVIlE0DzMyV5g8ObP16m_ZZeaCevyejvXFthBDtu5I7al-kNNQirh2ILuhjq4zqIOpqUFfkSNALu7s&usqp=CAY', FALSE, ''),
  -- Moderately
    ('butterworms', 'protein', 'moderately', 'https://www.snakemuseum.com/2023-large_default/butterworms.jpg', FALSE, ''),
    ('beef', 'protein', 'moderately', 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/7729067/352197aee7e7ad1ec7881cd90f0cef5e_large.png&width=256&type=webp&quality=80', FALSE, 'Cook. Do not feed raw'),
    ('chicken', 'protein', 'moderately', 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/7728906/cd987bedd902b5896c541ed31a11ec49_large.png&width=256&type=webp&quality=80', FALSE, 'Cook. Do not feed raw'),
    ('phoenix worms', 'protein', 'moderately', '', FALSE, ''),
    ('super worms', 'protein', 'moderately', 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQHef5kaLW7IWR8Ex7N6CgkVWjQLnV7yIhRiR35_sgF191vxPejSCAckh60kJ7q-ySjCNQGJJbyRdLt6cKGtVtvbMgywObWww&usqp=CAY', FALSE, ''),
    ('wax worms', 'protein', 'moderately', 'https://img.chewy.com/is/image/catalog/220500_main._AC_SL1500_V1582041793_.jpg', FALSE, ''),
  -- Occasionally
    ('cat food', 'protein', 'occasionally', 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00050000424443/9da038c7d43db93b821df85a8f3ef41a_large.png&width=256&type=webp&quality=80', FALSE, ''),
    ('mealworms', 'protein', 'occasionally', 'https://img.chewy.com/is/image/catalog/98578_MAIN._AC_SL1500_V1635433597_.jpg', FALSE, ''),
  -- Treats
    ('crickets', 'protein', 'occasionally', 'https://m.media-amazon.com/images/I/71MptFB1HQL._AC_SX679_.jpg', TRUE, ''),
    ('pinky mouse', 'protein', 'occasionally', 'https://m.media-amazon.com/images/I/41B4-5TC00L._AC_.jpg', TRUE, ''),
    ('eggs', 'protein', 'occasionally', 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00041130076305/d443cbda6e8e410d15712bd13e544668_large.png&width=256&type=webp&quality=80', TRUE, 'Can be eaten raw or boiled.'),
-- Supplements
    ('calcium', 'supplement', 'often', 'https://s7d2.scene7.com/is/image/PetSmart/5047843?$CLEARjpg$', FALSE, ''),
    ('multivitamin', 'supplement', 'often', 'https://m.media-amazon.com/images/I/817pGZlvwML._AC_SX679_.jpg', FALSE, '')