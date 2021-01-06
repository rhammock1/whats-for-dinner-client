/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/api-service';
import './Favorites.css';

const FavoriteRecipe = (props) => {
  const { recipe } = props || {};

  return (
    <div className="detail">
      <p>
        <Link className="detail-link" to={`/recipes/${recipe.id}`}>
          {recipe.title}
          {' '}
        </Link>
        <span id="style">recipe</span>
      </p>
    </div>
  );
};

const FavoriteRestaurant = (props) => {
  const { restaurant } = props || {};
  return (
    <div className="detail">
      <p>
        <Link className="detail-link" to={`/restaurants/${restaurant.id}`}>
          {restaurant.title}
          {' '}
        </Link>
        <span id="style">{restaurant.style}</span>
      </p>
    </div>
  );
};

class Favorites extends React.Component {
  static defaultProps = {
    match: {
      params: {
        userId: 0,
      },
    },
  }

  state = {
    error: null,
    favorites: [],
    recipes: [],
    restaurants: [],
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    apiService.getUsersThings(userId, 'favorites')
      .then((favorites) => this.setState({ favorites }))
      .catch((error) => this.setState({ error }));
    apiService.getUsersThings(userId, 'recipes')
      .then((recipes) => this.setState({ recipes }))
      .catch((error) => this.setState({ error }));
    apiService.getUsersThings(userId, 'restaurants')
      .then((restaurants) => this.setState({ restaurants }))
      .catch((error) => this.setState({ error }));
  }

  handleBuildFavorites = (favorite) => {
    const whatItIS = `${favorite.what_it_is}s`;
    const { restaurants, recipes } = this.state;
    let favoriteThing;
    if (whatItIS === 'restaurants') {
      favoriteThing = restaurants.filter((restaurant) => restaurant.id === favorite.item_id);

      return (
        <FavoriteRestaurant key={favorite.id} restaurant={favoriteThing} />
      );
    }
    if (whatItIS === 'recipes') {
      favoriteThing = recipes.filter((recipe) => recipe.id === parseFloat(favorite.item_id));

      return (
        <FavoriteRecipe key={favorite.id} recipe={favoriteThing} />
      );
    }
    return favoriteThing;
  }

  render() {
    const { favorites, error } = this.state;

    return (
      <section className="favorites">
        <h2>My Favorites</h2>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="favorites-container">
          {favorites.map((favorite) => this.handleBuildFavorites(favorite))}
        </div>
      </section>

    );
  }
}

export default Favorites;
