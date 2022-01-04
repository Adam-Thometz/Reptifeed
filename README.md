# 🦎 Reptifeed 🦎

#### developed by Adam Thometz

## Info about repo

### What is Reptifeed?

Reptifeed is an app that is designed to offer suggestions to reptile owners on what to feed their pets. A user stores information about their reptiles, fills up a virtual pantry that matches what they have in their kitchen, and gets suggestions on what to feed and how often. The app mixes up suggestions in order to keep reptile diets balanced.

### How Does It Work?

When a user makes an account, they are then prompted to add at least one reptile and add some foods that their reptiles eat often to their pantry. They can then feed their reptile based on what's in their pantry and if the pantry is not full enough, they must add other foods to their pantry.

The user can learn about the foods they need to feed a balanced diet by checking out the foods page, which is also where they can go to add foods to their pantry. At the moment, it only works for blue tongue skinks. Learn more in the 'Where Does the Food Data Come From?' section.

The app keeps track of a specific reptile's diet by randomly assigning food based on a stack of frequencies* that is kept in localStorage for each reptile, which replenishes everytime it runs out. It searches the user's pantry to look for foods of the frequency. This feature only runs when the user meets certain criteria, which is outlined in the user's todo list.

*`exampleFreqStack = ['occasionally', 'often', 'often', 'moderately', 'often', 'often']`
Stacks for this app can be found in `/forntend/src/utils/foodStack.js`

### Where Does the Food Data Come From?

I got the data for this from two main sources and then pieced them together in `backend/reptifeed-skink-diet.sql`:

- This chart: https://bluetongueskinks.net/foodchart.html
- This page: https://www.lizards101.com/what-can-blue-tongue-skinks-eat-and-not-eat-60-foods/

Consistent data on what blue tongue skinks eat was hard to come by, which was one of the reasons I started developing this app. As a new blue tongue skink owner, I was excited but also overwhelmed by the amount of choices regarding what they could eat. I plan to refine the data as I learn more about what skinks eat, perhaps even add in information about nutirition amounts. I also hope to add capabilities for bearded dragons and such in the future!

### Tech stack:

- *Frontend*: React.js, React Router, CSS
- *Backend*: Node.js, Express, SQL, PostgresQL
- *Other*: Jest

## Using this repo

### How to run app locally

**Make sure you have `psql` command available. This app runs on PostgresQL.**

1. Go into the backend driectory and activate `reptifeed.sql`

```
cd backend
psql -f reptifeed.sql
```
You should receive a prompt to delete and recreate the 'reptifeed' and the 'reptifeed_test' databases. Agree to both.

2. Activate the server on the backend.

```
node server.js
```
It should be listening on port 3001.

3. Go into the frontend directory and activate frontend

```
cd ../frontend
npm start
```
It should show the home page.

### How to add a reptile database to expand the selection of reptiles

1. Create a sql file in the /backend directory.
2. In the file, create a table with the following schema:

```
CREATE TABLE (REPTILE_IN_CAMEL_CASE)_diet (
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  frequency TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT 'https://previews.123rf.com/images/urfandadashov/urfandadashov1805/urfandadashov180500070/100957966-photo-not-available-icon-isolated-on-white-background-vector-illustration.jpg',
  is_treat BOOLEAN NOT NULL,
  tips TEXT
);
```
3. Insert data into the sql file:

```
INSERT INTO (REPTILE_IN_CAMEL_CASE)_diet (name, type, frequency, image, is_treat, tips)
VALUES ...
```

4. Go into reptifeed.sql and add the following for both `reptifeed` AND `reptifeed_test` databases

```
\i reptifeed-schema.sql
\i reptifeed-skink-diet.sql
\i // YOUR FILE NAME
```
5. Go to `/frontend/src/food/FoodOptions.js` and in the group with the Species label, nest the following into the `<select>` tag:

```
<option value="reptile-name">Reptile Name</option>
```

Make sure that the value attribute is the same as the database name (minus `_diet`) excepts with dashes (`-`) instead of low dashes (`_`).

*Example: database name = bearded_dragon_diet, value name = 'bearded-dragon'*