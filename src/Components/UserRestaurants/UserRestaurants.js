/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context';
import apiService from '../../services/api-service';
import './UserRestaurants.css';
// TODO:
//  Favorites becomes undefined on login, need to assign a default value to prevent that
//  Need to add validation so there wont be duplicates in this.state.favorites
//  Remove Console.log()
//  Needs to be refactored to move some things to helper functions or the like. This file is too large

class UserRestaurants extends React.Component {
  static defaultProps = {
    match: {
      params: {
        userId: 0,
      },
    },
  }

  static contextType = Context;

  state = {
    error: null,
    restaurants: [],
    splicedRestaurants: [],
    added: false,
    favorites: [],
    deleted: false,
    favoriteRestaurants: [],
    restaurantId: 0,
    isResolved: false,
  }

  componentDidMount() {
    // Makes API calls to get restaurants and favoritees
    // Should prolly be refactored so it uses context from the APP component instead of making it's own api request?
    const { userId } = this.props.match.params;
    let favorites;
    let restaurants;
    apiService.getUsersThings(userId, 'restaurants')
      .then((resRestaurants) => { restaurants = resRestaurants; })
      .catch((error) => this.setState({ error }));
    apiService.getUsersThings(userId, 'favorites')
      .then((resFavorites) => { favorites = resFavorites; })
      .then(() => this.setState({ restaurants, favorites }))
      .then(() => {
        this.handleFavorites();
        this.setState({ isResolved: true });
      })
      .catch((error) => this.setState({ error }));
  }

  // Removes duplicates from favoritedRestaurants array
  // Compares favorited restaurants with state.restaurants to prevent duplicate rendering
  //
  handleFavorites = () => {
    const { favorites, restaurants } = this.state;
    const favoritedRestaurants = favorites.filter((favorite) => favorite.what_it_is === 'restaurant');
    let removedDoubles = [];
    for (let i = 0; i < favoritedRestaurants.length; i++) {
      removedDoubles.push(favoritedRestaurants.filter((favorite) => (favorite.item_id === favoritedRestaurants[i].item_id)));
    }

    const doubleFree = [];
    removedDoubles.filter((array) => ((array.length < 2)
      ? doubleFree.push(array[0])
      : null));

    removedDoubles = removedDoubles.filter((array) => (array.length >= 2));

    const singleDouble = removedDoubles.map((double) => double[0]);

    const set = new Set(singleDouble);
    const iterator = set.entries();

    if (set.size > 0) {
      for (let i = 0; i < set.size; i++) {
        doubleFree.push(iterator.next().value[0]);
      }
    }

    const restaurantsInState = [...restaurants];
    const filtered = [];
    let newArray;
    if (doubleFree.length > 0) {
      for (let i = 0; i < doubleFree.length; i++) {
        filtered.push(restaurantsInState.filter((restaurant) => (restaurant.id === doubleFree[i].item_id)));

        const itemIds = doubleFree.map((each) => each.item_id);

        newArray = restaurantsInState.filter((restaurant) => !itemIds.includes(restaurant.id));
      }
    } else {
      newArray = restaurantsInState;
    }
    const favRestaurants = [];
    filtered.map((array) => array.map((restaurant) => favRestaurants.push(restaurant)));
    this.setState({ favoriteRestaurants: favRestaurants });
    this.setState({ splicedRestaurants: newArray });
  }

handleAddToFavorites = (event) => {
  event.preventDefault();
  const restaurantId = event.target.id;

  const { userId } = this.props.match.params;
  const newFavorite = {
    what_it_is: 'restaurant',
    user_id: userId,
    item_id: restaurantId,
  };

  apiService.postNewFavorite(userId, newFavorite)
    .then(() => { this.setState({ added: true, restaurantId: parseFloat(restaurantId) }); })
    .then(() => {
      apiService.getUsersThings(userId, 'favorites')
        .then((favorites) => {
          this.setState({ favorites });
        })
        .then(async () => this.handleFavorites())
        .catch((error) => this.setState({ error }));
    })
    .then(() => {
      setTimeout(
        () => { this.setState({ added: false }); },
        5000,
      );
    })
    .catch((error) => this.setState({ error }));
}

handleRemoveFromFavorites = (event) => {
  event.preventDefault();

  const { userId } = this.props.match.params;
  const { favorites } = this.state;
  const favoritedRestaurants = favorites.filter((favorite) => favorite.what_it_is === 'restaurant');

  const restaurantId = event.target.id;

  const favoriteToDelete = favoritedRestaurants.filter((favorite) => favorite.item_id === parseFloat(restaurantId));

  const favoriteId = favoriteToDelete[0].id;

  apiService.deleteFavorite(userId, favoriteId)
    .then(() => { this.setState({ deleted: true }); })
    .then(() => {
      apiService.getUsersThings(userId, 'favorites')
        .then((each) => this.setState({ favorites: each }))
        .then(async () => this.handleFavorites())
        .catch((error) => this.setState({ error }));
    })
    .then(() => {
      setTimeout(
        () => { this.setState({ deleted: false }); },
        5000,
      );
    })
    .catch((error) => this.setState({ error }));
}

handleDelete = (event) => {
  event.preventDefault();
  const id = parseFloat(event.target.id);
  const { userId } = this.props.match.params;
  const { favorites, splicedRestaurants, favoriteRestaurants } = this.state;
  const favorite = favorites.filter((each) => each.item_id === id && each.what_it_is === 'restaurant') || [];

  const restOfTheFavoriteRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.id !== id);

  let allButDeleted;
  if (favorite.length > 0) {
    const favoriteId = favorite[0].id;

    allButDeleted = [...splicedRestaurants].filter((restaurant) => restaurant.id !== id);

    apiService.deleteFavorite(userId, favoriteId)
      .then(() => {
        apiService.deleteThing(id, 'restaurants')
          .then(() => {
            this.setState({ splicedRestaurants: allButDeleted });
          })
          .catch((error) => this.setState({ error }));
      })
      .then(() => {
        this.setState({ favoriteRestaurants: restOfTheFavoriteRestaurants });
      })
      .catch((error) => this.setState({ error }));
  } else {
    allButDeleted = [...splicedRestaurants].filter((restaurant) => restaurant.id !== id);

    apiService.deleteThing(id, 'restaurants')
      .then(() => {
        this.setState({ splicedRestaurants: allButDeleted });
      });
  }
}

render() {
  const {
    favoriteRestaurants,
    splicedRestaurants,
    error,
    added,
    restaurantId,
    isResolved,
  } = this.state;
  const { userId } = this.props.match.params;
  return (
    <section className="user-restaurants">
      <h2>My Restaurants</h2>
      <div role="alert">{error && <p className="red">{error}</p>}</div>
      <div className="restaurant-container">
        {(isResolved)
          ? (favoriteRestaurants.map((restaurant) => (
            // Favorite restaurants first
            <div className="detail" key={restaurant.id}>
              <p>
                <Link className="detail-link" to={`/restaurants/${restaurant.id}`}>
                  {restaurant.title}
                  {' '}
                </Link>
                <span id="style">{restaurant.style}</span>
              </p>
              {(added && restaurantId === restaurant.id)
                ? (
                  <div className="added">
                    <p>Successfully added to favorites</p>
                  </div>
                )
                : null}
              <div className="favorite">
                <label htmlFor={restaurant.id} className="label">Remove from favorites</label>
                <input type="image" alt="button-to-remove-from-favorite" id={restaurant.id} onClick={(event) => this.handleRemoveFromFavorites(event)} src="https://img.icons8.com/office/16/000000/add-to-favorites--v2.png" />
              </div>
              <button type="button" className="delete" id={restaurant.id} onClick={this.handleDelete}>Delete restaurant</button>
            </div>
          )),
          splicedRestaurants.map((restaurant, index) => (
            <div className="detail" key={index}>
              <p>
                <Link className="detail-link" to={`/restaurants/${restaurant.id}`}>
                  {restaurant.title}
                  {' '}
                </Link>
                <span id="style">{restaurant.style}</span>
              </p>
              {(splicedRestaurants.length > 0)
                ? (
                  <div className="favorite">
                    <label htmlFor={restaurant.id} className="label">Add to favorites</label>
                    <input type="image" alt="button-to-add-to-favorite" id={restaurant.id} onClick={(event) => this.handleAddToFavorites(event)} src="https://img.icons8.com/office/16/000000/add-to-favorites--v2.png" />
                  </div>
                )
                : null}
              <button type="button" className="delete" id={restaurant.id} onClick={this.handleDelete}>Delete restaurant</button>
            </div>
          )))
          : <p>loading...</p>}

        <button type="button" className="add"><Link to={`/${userId}/newThing`}>Add new restaurant </Link></button>
      </div>
    </section>

  );
}
}

export default UserRestaurants;
