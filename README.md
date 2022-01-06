# 🦎 Reptifeed 🦎

#### developed by Adam Thometz

Check out deployment: https://reptifeed.surge.sh/

## Info about repo

### What is Reptifeed? 🐸

Reptifeed is an app that is designed to offer suggestions to reptile owners on what to feed their pets. A user stores information about their reptiles, fills up a virtual pantry that matches what they have in their kitchen, and gets suggestions on what to feed and how often. The app mixes up suggestions in order to keep reptile diets balanced.

### How Does It Work? 🌿

When a user makes an account, they are then prompted to add at least one reptile and add some foods that their reptiles eat often to their pantry. They can then feed their reptile based on what's in their pantry.

The user can learn about the foods they need to feed a balanced diet by checking out the foods page. At the moment, it only works for blue tongue skinks. Learn more in the 'Where Does the Food Data Come From?' section.

The app keeps track of a specific reptile's diet by randomly assigning food based on a frequency pulled from a stack of frequencies*. This stack is kept in localStorage for each reptile and replenishes everytime it runs out.

*`exampleFreqStack = ['occasionally', 'often', 'often', 'moderately', 'often', 'often']`
Stacks for this app can be found in `/forntend/src/utils/foodStack.js`

### Where Does the Food Data Come From? 🍎

I got the data for this from two main sources and then pieced them together in `backend/reptifeed-skink-diet.sql`:

- This chart: https://bluetongueskinks.net/foodchart.html
- This page: https://www.lizards101.com/what-can-blue-tongue-skinks-eat-and-not-eat-60-foods/

Truly consistent data on what blue tongue skinks eat was hard to come by, which was one of the reasons I started developing this app. As a new blue tongue skink owner, I was excited but also overwhelmed by the amount of choices regarding what they could eat. I plan to refine the data as I learn more about what skinks eat, perhaps even add in information about nutirition amounts. I also hope to add capabilities for bearded dragons and such in the future!

### Authentication overview

A user token is required for all the routes (listed below). A token could be for users or for admin.

There are two test accounts available on the app when you run locally, one for regular users, and one for admin:

User:
- Username: testuser
- Password: testpassword

Admin:
- Username: testadmin
- Password: adminpassword

Authentication middleware is located in `/backend/middleware`

### Routing Overview

Routes on the backend are divided into five sections:

1. API routes (this provides access to the food API - login required):
   1. `GET /api/:species/foods`: Get all foods by species.
   2. `GET /api/:species/foods/:food`: Get a specific food for a species.
   3. `GET /api/:species/types/:type`: Get a food group for a species.
   4. `GET /api/:species/treats`: Get treats for a species.
2. Auth routes (authentication routes - no authentication required to access):
   1. `POST /auth/register`: Register for an account.
   2. `POST /auth/login`: Login to your account.
3. User routes (user-related routes - admin or user only):
   1. `POST /users`: Create an account (**not to be confused with the register route above**).**
   2. `GET /users`: Get all users.**
   3. `GET /users/:id`: Get a user.
   4. `PATCH /users/:id`: Edit a user.
   5. `DELETE /users/:id`: Delete a user.
4. Reptile routes (reptile-related routes - admin or owner only):
   1. `POST /reptiles`: Create a new reptile.
   2. `GET /reptiles`: Get all reptiles.**
   3. `GET /reptiles/:id`: Get a specfic reptile.
   4. `GET /reptiles/owner/:id/`: Get all reptiles by owner.
   5. `PATCH /reptiles/:id`: Edit a reptile.
   6. `DELETE /reptiles/:id`: Delete a reptile.
5. Pantry routes (pantry-related routes - admin or owner only):
   1. `GET /pantries/:id`: Get a user's pantry.
   2. `POST /pantries/:id`: Add a food to the user's pantry.
   3. `DELETE /pantries/:id/:food`: Remove a food from the user's pantry.

**Admin only

### Tech stack:

- *Frontend*: React.js, React Router, CSS
- *Backend*: Node.js, Express, SQL, PostgresQL
- *Other*: Jest, Heroku

## Using this repo

### How to run app locally

**Make sure you have `psql` command available. This app runs on PostgresQL.**

1. Go into the backend driectory and activate `reptifeed.sql`

```
cd backend
psql -f reptifeed.sql
```
You should receive a prompt to delete and recreate the 'reptifeed' and the 'reptifeed_test' databases. Agree to both.

2. Activate the API by running `reptifeed-api.sql`

```
psql -f reptifeed-api.sql
```
You should receive a prompt to create the API for both the 'reptifeed' and the 'reptifeed_test' databases. Agree to both.

3. Activate the server on the backend.

```
node server.js
```
It should be listening on port 3001. Add `--inspect` in the middle for debugging ability.

4. Go into the frontend directory and activate frontend

```
cd ../frontend
npm start
```
It should load the home page.

### How to run tests

Easy!

Backend:
```
jest
```
Frontend:
```
npm test
```


### How to add a reptile food database to expand the selection of reptiles

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

4. Go into reptifeed-api.sql and add the following for both `reptifeed` AND `reptifeed_test` databases

```
\i reptifeed-skink-diet.sql
\i // YOUR FILE NAME
```

Reactvate with `psql -f reptifeed-api.sql`

5. Go to `/frontend/src/food/FoodOptions.js` and in the group with the Species label, nest the following into the `<select>` tag:

```
<option value="reptile-name">Reptile Name</option>
```

Make sure that the value attribute is the same as the database name (minus `_diet`) except with dashes (`-`) instead of low dashes (`_`).

*Example: database name = bearded_dragon_diet, value name = 'bearded-dragon'*