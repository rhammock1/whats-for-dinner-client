import React from 'react';
import { Route } from 'react-router-dom';
import Favorites from '../Components/Favorites/Favorites';
import NewThing from '../Components/NewThing/NewThing';
import UserRecipes from '../Components/UserRecipes/UserRecipes';
import UserRestaurants from '../Components/UserRestaurants/UserRestaurants';

function UserPage() {
  return (
    <section className="user-page">
      <Route path="/:userId/recipes" component={UserRecipes} />
      <Route path="/:userId/restaurants" component={UserRestaurants} />
      <Route path="/:userId/favorites" component={Favorites} />
      <Route path="/:userId/newThing" component={NewThing} />
    </section>

  );
}

export default UserPage;
