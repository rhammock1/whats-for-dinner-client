import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../Components/404/404';
import Favorites from '../Components/Favorites/Favorites';
import NewThing from '../Components/NewThing/NewThing';
import UserRecipes from '../Components/UserRecipes/UserRecipes';
import UserRestaurants from '../Components/UserRestaurants/UserRestaurants';

function UserPage() {
  return (
    <section className="user-page">
      <Switch>
        <Route exact path="/users/:userId/recipes" component={UserRecipes} />
        <Route exact path="/users/:userId/restaurants" component={UserRestaurants} />
        <Route exact path="/users/:userId/favorites" component={Favorites} />
        <Route exact path="/users/:userId/newThing" component={NewThing} />
        <Route component={NotFound} />
      </Switch>
    </section>

  );
}

export default UserPage;
