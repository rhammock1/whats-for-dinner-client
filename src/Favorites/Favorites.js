import React from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api-service';


const FavoriteRecipe = function(props) {
  const recipe = props.recipe[0] || {}
  
  return (
     <div>
        <Link to={`/recipes/${recipe.id}`}><p>{recipe.title}</p></Link>
      </div>
    )
}

const FavoriteRestaurant = function(props) {
  
  const restaurant = props.restaurant[0] || {}
  return (
    <div>
      <Link to={`/restaurants/${restaurant.id}`}><p>{restaurant.title} <span id='style'>{restaurant.style}</span></p></Link>
    </div>
  )
  
}



class Favorites extends React.Component {

  state = {
    favorites: [],
    recipes: [],
    restaurants: [],
  }


  componentDidMount() {
    const {userId} = this.props.match.params
    apiService.getUsersThings(userId, 'favorites')
      .then(favorites => this.setState({favorites}))
      .catch(error => console.error(error))
    apiService.getUsersThings(userId, 'recipes')
      .then(recipes => this.setState({recipes}))
      .catch(error => console.error(error))
    apiService.getUsersThings(userId, 'restaurants')
      .then(restaurants => this.setState({restaurants}))
      .catch(error => console.error(error))
}

  handleBuildFavorites = (favorite) => {
    const whatItIS = `${favorite.what_it_is}s`
    let favoriteThing;
    if(whatItIS === 'restaurants') {
      favoriteThing = this.state.restaurants.filter(restaurant => restaurant.id === favorite.item_id)
      
      return (
        <FavoriteRestaurant key={favoriteThing.id} restaurant={favoriteThing} />
      )
    }
    if(whatItIS === 'recipes') {
      favoriteThing = this.state.recipes.filter(recipe => recipe.id === parseFloat(favorite.item_id))
      
      return (
        <FavoriteRecipe key={favoriteThing.id}recipe={favoriteThing} />
      )
    }
  }
  render() {
    const favorites = this.state.favorites;

    return (
      <section className='favorites'>
        <h2>My Favorites</h2>
        <div className='favorites-container'>
          {favorites.map(favorite => {
            return this.handleBuildFavorites(favorite)
            
          })}
        </div>
      </section>

      )
  }
}

export default Favorites;