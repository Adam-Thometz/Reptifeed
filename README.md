# 🦎 Reptifeed 🦎

![Reptifeed Home Page](user-flow-pictures/home.png)

#### developed by Adam Thometz

[Link to deployment](https://reptifeed.surge.sh/)

## Table of Contents
[I. Info About Repo (high level)](#info-about-repo-high-level)  
[-- i. What is Reptifeed?](#what-is-reptifeed)  
[-- ii. How Does It Work?](#how-does-it-work)  
[-- iii. Where Does The Food Data Come From?](#where-does-the-food-data-come-from)  
[II. Info About Repo (technical details)](#info-about-repo-technical-details)  
[-- i. Tech Stack](#tech-stack)  
[-- ii. Database Schema](#database-schema)  
[-- iii. Authentication Overview](#authentication-overview)  
[-- iv. Routing Overview](#routing-overview)  
[-- v. Sample User Flow](#sample-user-flow)  
[III. Using This Repo](#using-this-repo)  
[-- i. How to run app locally](#how-to-run)  
[-- ii. How to run tests](#how-to-test)  
[-- iii. How to add a reptile food database](#how-to-add-database)  

## Info about repo (high-level) {info-about-repo-high-level}

### What is Reptifeed? 🐸 {what-is-reptifeed}

Reptifeed is an app that is designed to offer suggestions to reptile owners on what to feed their pets. A user stores information about their reptiles, fills up a virtual pantry that matches what they have in their kitchen, and gets suggestions on what to feed and how often. The app mixes up suggestions in order to keep reptile diets balanced.

### How Does It Work? 🌿 {how-does-it-work}

When a user makes an account, they are then prompted to add at least one reptile and add some foods that their reptiles eat often to their pantry. They can then feed their reptile based on what's in their pantry.

The user can learn about the foods they need to feed a balanced diet by checking out the foods page. At the moment, it only works for blue tongue skinks. Learn more in the 'Where Does the Food Data Come From?' section.

The app keeps track of a specific reptile's diet by randomly assigning food based on a frequency pulled from a stack of frequencies*. This stack is kept in localStorage for each reptile and replenishes everytime it runs out.

*`exampleFreqStack = ['occasionally', 'often', 'often', 'moderately', 'often', 'often']`
Stacks for this app can be found in `/frontend/src/utils/foodStack.js`

### Where Does the Food Data Come From? 🍎 {where-does-the-food-data-come-from}

I got the data for this from two main sources and then pieced them together in `backend/reptifeed-skink-diet.sql`:

- This chart: https://bluetongueskinks.net/foodchart.html
- This page: https://www.lizards101.com/what-can-blue-tongue-skinks-eat-and-not-eat-60-foods/

Truly consistent data on what blue tongue skinks eat was hard to come by, which was one of the reasons I started developing this app. As a new blue tongue skink owner, I was excited but also overwhelmed by the amount of choices regarding what they could eat. I plan to refine the data as I learn more about what skinks eat, perhaps even add in information about nutirition amounts. I also hope to add capabilities for bearded dragons and such in the future!

## Info about Repo (technical details) {#info-about-repo-technical-details}

### Tech stack {tech-stack}

- *Frontend*: React.js, React Router, CSS
- *Backend*: Node.js, Express, SQL, PostgresQL
- *Other*: Jest, Heroku

### Database Schema {database-schema}

![Database schema](reptifeed-schema-visual.png)

### Authentication overview {authentication-overview}

A user token is required for nearly all routes (listed below). A token could be for users or for admin.

There are two test accounts available on the app when you run locally, one for regular users, and one for admin:

User:
- Username: testuser
- Password: testpassword

Admin:
- Username: testadmin
- Password: adminpassword

Tokens for these accounts can be found in `/backend/reptifeed-schema.sql`
*Please note that this login info is not available in the deployed version*

Authentication middleware is located in `/backend/middleware/auth.js`.

### Routing Overview {routing-overview}

Routes on the backend are divided into five sections:

1. API routes (this provides access to the food API - login required):
   1. `GET /api/:species/foods`: Get all foods by species. (You can also put a searchTerm into the query section to search for foods)
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

### Sample User Flow {sample-user-flow}

Log in or register...

![Login page](user-flow-pictures/login.png)

...takes you to user profile. What's in next steps?

![Profile page for testuser](user-flow-pictures/profile-todos.png)

Things to do to set up! Let's start with adding a reptile! (hint: Clicking on the todo brings you where you need to go)

![Todo list](user-flow-pictures/todos.png)

Let's add our baby!

![New reptile form](user-flow-pictures/add-new-reptile.png)

Success! Can we feed her yet?

![Added reptile](user-flow-pictures/reptile.png)

Bummer! We need to get some food. Off to the todos!

![No food!](user-flow-pictures/reptile-no-food.png)

Well, the todo list is shorter! Let's go add some food!

![Todo list](user-flow-pictures/todos-9-items.png)

We're on the food page! You can get food by type or species (blue tongue skink only for now), search for food, and even filter treats

![Food page](user-flow-pictures/food-page.png)

After searching through my real pantry, I found that I have arugula, dog food, mangoes, and calcium and multivitamin supplements and checked them off.

This is what my pantry looks like now:

![Pantry](user-flow-pictures/pantry.png)

NOOWWWW we can feed her!

![Feeding time](user-flow-pictures/feed.png)

And we can feed treats too!

![Treat time](user-flow-pictures/feed-treat.png)

You might be reminded to add more food to your pantry. That won't stop you from feeding your pet, since you clearly have the important stuff at this point.

![Prompt to get more food!](user-flow-pictures/need-more.png)

Clicking the alert takes you to the todo page. Let's see what we have!

![Todos with only nice to haves](user-flow-pictures/nice-to-haves-only.png)

Back to the food page!

![Food page](user-flow-pictures/food-page.png)

I found some beef, mealworms, bok choy, beets, and basil. They're now in my virtual pantry.

![Updated pantry](user-flow-pictures/pantry-update.png)

Now I have a varied diet for Unity. Look how happy she is!

![A picture of Unity](user-flow-pictures/happy-unity.png)

## Using this repo {using-this-repo}

### How to run app locally {how-to-run}

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
You should receive a prompt to create the API for both the 'reptifeed' and 'reptifeed_test' databases. Agree to both.

3. Activate the server on the backend.

```
node server.js
```
It should be listening on port 3001. Add `--inspect` in the middle of this command for debugging ability.

4. Go into the frontend directory and activate frontend

```
cd ../frontend
npm start
```
It should run on port 3000 and load the home page.

### How to run tests {how-to-test}

Simple!

Test backend:
```
cd backend
jest
```
Test frontend:
```
cd frontend
npm test
```

### How to add a reptile food database to expand the selection of reptiles {how-to-add-database}

1. Create a sql file in the backend directory.
2. In the file, place this code, replacing `REPTILE_NAME` with the name of the reptile in camel case:

```
CREATE TABLE (REPTILE_NAME)_diet (
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
INSERT INTO (REPTILE_NAME)_diet (name, type, frequency, image, is_treat, tips)
VALUES ...
```

`type` should be either `vegetable`, `protein`, `fruit`, or `supplement`  
`frequency` should be either `often`, `moderately`, or `occasionally`

4. Go into `reptifeed-api.sql` and add the following for both `reptifeed` AND `reptifeed_test` databases

```
DROP TABLE blue_tongue_skink_diet;
DROP TABLE (new table)
\i reptifeed-skink-diet.sql
\i (new file)
```

5. Reactvate API with `psql -f reptifeed-api.sql`

6. Go to `/frontend/src/food/FoodOptions.js` and in the group with the Species label, nest the following into the `<select>` tag:

```
<option value="reptile-name">Reptile Name</option>
```

Make sure that the value attribute is the same as the database name (minus `_diet`) except with dashes (`-`) instead of low dashes (`_`).

*Example: database name = bearded_dragon_diet, value name = 'bearded-dragon'*