import React from 'react';
import { Route } from 'react-router-dom';
import Favorites from '../Favorites/Favorites';
import NewThing from '../NewThing/NewThing';
import UserRecipes from '../UserRecipes/UserRecipes';
import UserRestaurants from '../UserRestaurants/UserRestaurants';

class UserPage extends React.Component {
  render() {
    return (
      <section className='user-page'>
        <Route path='/:userId/recipes' component={UserRecipes} />
        <Route path='/:userId/restaurants' component={UserRestaurants} />
        <Route path='/:userId/favorites' component={Favorites} />
        <Route path='/:userId/newThing' component={NewThing} />

      </section>

      )
  }
}

export default UserPage;