/* eslint-disable react/no-unused-state */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint linebreak-style: [0, "unix"] */
import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Header from '../Header/Header';
import config from '../../config';
import './App.css';
import Filter from '../Filter/Filter';
import Wheel from '../Wheel/Wheel';
import Context from '../../Context';
import Footer from '../Footer/Footer';
import RestaurantDetailView from '../RestaurantDetailView/RestaurantDetailView';
import RecipeDetailView from '../RecipeDetailView/RecipeDetailView';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import RegistrationPage from '../../routes/RegistrationPage';
import PrivateRoute from '../Utils/PrivateRoute';
import UserPage from '../../routes/UserPage';
import LoginPage from '../../routes/LoginPage';
import TokenService from '../../services/token-service';
import apiService from '../../services/api-service';
import Popup from '../Popup/Popup';

class App extends Component {
  state = {
    recipes: [],
    restaurants: [],
    userRecipes: [],
    userRestaurants: [],
    inOrOut: '',
    style: '',
    wheelOptions: [],
    touched: false,
    recipe: {},
    hasError: false,
    loggedIn: false,
    userId: 0,
    favorites: [],
    hasVisited: false,
  }

  static getDerivedStateFromError(error) {
    this.setState({ hasError: error });
    return { hasError: true };
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      this.setState({ loggedIn: true });

      const userId = TokenService.getUserId();

      this.setState({ userId });

      if (TokenService.getHasVisited()) {
        this.setState({ hasVisited: true });
      }

      Promise.all([

        fetch(`${config.API_ENDPOINT}/dinner/${userId}/restaurants`, {

          headers: {

            Authorization: `bearer ${TokenService.getAuthToken()}`,

          },

        }),

        fetch(`${config.API_ENDPOINT}/dinner/${userId}/recipes`, {

          headers: {

            Authorization: `bearer ${TokenService.getAuthToken()}`,

          },

        }),

      ])

        .then(([userRestaurantsRes, userRecipesRes]) => {
          if (!userRestaurantsRes.ok) {
            return userRestaurantsRes.json().then((e) => Promise.reject(e));
          }

          if (!userRecipesRes.ok) {
            return userRecipesRes.json().then((e) => Promise.reject(e));
          }

          return Promise.all([

            userRestaurantsRes.json(),

            userRecipesRes.json(),

          ]);
        })

        .then(([userRestaurants, userRecipes]) => {
          this.setState({ userRecipes, userRestaurants });

          this.getFavorites();
        })

        .catch((error) => {
          this.setState({ error });
        });
    }

    Promise.all([
      fetch(`${config.API_ENDPOINT}/restaurants`),
      fetch(`${config.API_ENDPOINT}/recipes`),
    ])
      .then(([restaurantsRes, recipesRes]) => {
        if (!restaurantsRes.ok) {
          return restaurantsRes.json().then((e) => Promise.reject(e));
        }

        if (!recipesRes.ok) {
          return recipesRes.json().then((e) => Promise.reject(e));
        }

        return Promise.all([

          restaurantsRes.json(),

          recipesRes.json(),

        ]);
      })

      .then(([rests, recis]) => {
        const restaurants = rests.filter((restaurant) => restaurant.user_id === null);

        const recipes = recis.filter((recipe) => recipe.user_id === null);

        this.setState({ recipes, restaurants });
      })

      .catch((error) => {
        this.setState({ error });
      });
  }

  findRecipe = (recipeId) => fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`)

    .then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      }

      return res.json();
    })

    .then((recipe) => {
      this.setState({

        recipe,

      });

      return recipe;
    })

    .catch((error) => {
      this.setState({ error });
    })

  handleToken = async () => {
    TokenService.hasAuthToken()
      ? this.setState({ loggedIn: true })
      : this.setState({ loggedIn: false });

    const userId = TokenService.getUserId();

    this.setState({ userId });

    await this.getFavorites();
  }

  handleChange = (ev) => {
    const { touched } = this.state;
    if (touched === true) {
      this.setState({ touched: false });
    }

    const filterOption = ev.target.id;
    (filterOption === 'inOrOut')
      ? this.setState({ inOrOut: ev.target.value })
      : this.setState({ style: ev.target.value });
  }

  getFavorites = () => {
    if (TokenService.hasAuthToken()) {
      const userId = TokenService.getUserId();

      apiService.getUsersThings(userId, 'favorites')

        .then((favorites) => this.setState({ favorites }))

        .catch((error) => this.setState({ error }));
    }
  }

  handleWheelOptions = (e) => {
    e.preventDefault();

    this.setState({ touching: false, touched: true });

    const wheelOptions = [];
    const {
      loggedIn,
      inOrOut,
      favorites,
      userRecipes,
      recipes,
      userRestaurants,
      restaurants,
      style,
    } = this.state;
    if (loggedIn && inOrOut === 'recipes') {
      let filteredFavorites;

      if (favorites.length > 0) {
        filteredFavorites = favorites.filter((favorite) => favorite.what_it_is === 'recipe');

        const filtered = [];

        const recipeIds = userRecipes.map((recipe) => recipe.id);

        for (let i = 0; i < filteredFavorites.length; i++) {
          if (recipeIds.includes(filteredFavorites[i].item_id)) {
            filtered.push(userRecipes.filter((recipe) => recipe.id === filteredFavorites[i].item_id));
          }
        }

        const favRecipes = [];

        filtered.map((array) => array.map((recipe) => favRecipes.push(recipe)));

        for (let i = 0; i < 3; i++) {
          const chosen = favRecipes[Math.floor(Math.random() * favRecipes.length)];

          wheelOptions.push(chosen);
        }

        for (let i = 0; i < 6; i++) {
          const chosen = userRecipes[Math.floor(Math.random() * userRecipes.length)];

          wheelOptions.push(chosen);
        }
      } else if (userRecipes.length < 6) {
        for (let i = 0; i < 9; i++) {
          const chosen = recipes[Math.floor(Math.random() * recipes.length)];

          wheelOptions.push(chosen);
        }
      } else {
        for (let i = 0; i < 9; i++) {
          const chosen = userRecipes[Math.floor(Math.random() * userRecipes.length)];

          wheelOptions.push(chosen);
        }
      }
    } else if (inOrOut === 'recipes') {
      for (let i = 0; i < 9; i++) {
        const chosen = recipes[Math.floor(Math.random() * recipes.length)];

        wheelOptions.push(chosen);
      }
    }

    if (loggedIn && inOrOut === 'restaurants') {
      let favRestaurants = [];

      if (favorites.length > 0) {
        const filteredFavorites = favorites.filter((favorite) => favorite.what_it_is === 'restaurant');

        const filtered = [];

        for (let i = 0; i < filteredFavorites.length; i++) {
          filtered.push(userRestaurants.filter((restaurant) => restaurant.id === filteredFavorites[i].item_id));
        }

        favRestaurants = [...filtered];

        favRestaurants = favRestaurants.filter((restaurant) => restaurant.length < 1);

        filtered.map((array) => array.map((restaurant) => favRestaurants.push(restaurant)));
      } else if (userRestaurants.length < 6) {
        favRestaurants = restaurants;
      } else {
        favRestaurants = userRestaurants;
      }

      if (style === 'local') {
        const local = userRestaurants.filter((restaurant) => restaurant.style === 'local');

        if (local.length < 3) {
          const stateRestaurants = restaurants.filter((restaurant) => restaurant.style === 'local');

          local.push(...stateRestaurants);
        }

        for (let i = 0; i < 3; i++) {
          const chosen = restaurants[Math.floor(Math.random() * restaurants.length)];

          wheelOptions.push(chosen);
        }

        for (let i = 0; i < 6; i++) {
          const chosen = local[Math.floor(Math.random() * local.length)];

          wheelOptions.push(chosen);
        }
      }

      if (style === 'chain') {
        const chain = userRestaurants.filter((restaurant) => restaurant.style === 'chain');

        if (chain.length < 3) {
          const stateRestaurants = [...restaurants].filter((restaurant) => restaurant.style === 'chain');

          chain.push(...stateRestaurants);
        }

        for (let i = 0; i < 3; i++) {
          const chosen = restaurants[Math.floor(Math.random() * restaurants.length)];

          wheelOptions.push(chosen);
        }

        for (let i = 0; i < 6; i++) {
          const chosen = chain[Math.floor(Math.random() * chain.length)];

          wheelOptions.push(chosen);
        }
      }
    } else if (inOrOut === 'restaurants') {
      if (style === 'local') {
        const local = restaurants.filter((restaurant) => restaurant.style === 'local');

        for (let i = 0; i < 9; i++) {
          const chosen = local[Math.floor(Math.random() * local.length)];

          wheelOptions.push(chosen);
        }
      } else {
        const chain = restaurants.filter((restaurant) => restaurant.style === 'chain');

        for (let i = 0; i < 9; i++) {
          const chosen = chain[Math.floor(Math.random() * chain.length)];

          wheelOptions.push(chosen);
        }
      }
    }

    if (loggedIn && inOrOut === 'both') {
      const userFavorites = (favorites.length > 0)
        ? favorites
        : [...restaurants, ...recipes];

      let both;

      if (style === 'local') {
        const local = restaurants.filter((restaurant) => restaurant.style === 'local');
        if (local.length < 3) {
          const stateRestaurants = restaurants.filter((restaurant) => restaurant.style === 'local');

          local.push(...stateRestaurants);
        }

        both = [...local, ...recipes];

        for (let i = 0; i < 3; i++) {
          const chosen = userFavorites[Math.floor(Math.random() * userFavorites.length)];

          wheelOptions.push(chosen);
        }

        for (let i = 0; i < 6; i++) {
          const chosen = both[Math.floor(Math.random() * both.length)];

          wheelOptions.push(chosen);
        }
      } else if (style === 'chain') {
        const chain = restaurants.filter((restaurant) => restaurant.style === 'chain');

        if (chain.length < 3) {
          const stateRestaurants = restaurants.filter((restaurant) => restaurant.style === 'chain');

          chain.push(...stateRestaurants);
        }

        both = [...chain, ...recipes];

        for (let i = 0; i < 3; i++) {
          const chosen = userFavorites[Math.floor(Math.random() * userFavorites.length)];

          wheelOptions.push(chosen);
        }

        for (let i = 0; i < 6; i++) {
          const chosen = both[Math.floor(Math.random() * both.length)];

          wheelOptions.push(chosen);
        }
      } else {
        const either = [...userRestaurants, ...userRecipes];

        for (let i = 0; i < 3; i++) {
          const chosen = userFavorites[Math.floor(Math.random() * userFavorites.length)];

          wheelOptions.push(chosen);
        }

        for (let i = 0; i < 6; i++) {
          const chosen = either[Math.floor(Math.random() * either.length)];

          wheelOptions.push(chosen);
        }
      }
    } else if (inOrOut === 'both') {
      let both;

      if (style === 'local') {
        const local = restaurants.filter((restaurant) => restaurant.style === 'local');

        both = [...local, ...recipes];

        for (let i = 0; i < 9; i++) {
          const chosen = both[Math.floor(Math.random() * both.length)];

          wheelOptions.push(chosen);
        }
      } else if (style === 'chain') {
        const chain = restaurants.filter((restaurant) => restaurant.style === 'chain');

        both = [...chain, ...recipes];

        for (let i = 0; i < 9; i++) {
          const chosen = both[Math.floor(Math.random() * both.length)];

          wheelOptions.push(chosen);
        }
      } else {
        const either = [...restaurants, ...recipes];

        for (let i = 0; i < 9; i++) {
          const chosen = either[Math.floor(Math.random() * either.length)];

          wheelOptions.push(chosen);
        }
      }
    }

    this.setState({ wheelOptions });
  }

  handleClearDemo = () => {
    TokenService.setHasVisited();

    this.setState({ hasVisited: true });
  }

  renderMainView = () => {
    const { hasVisited, touched } = this.state;
    return (
      <>

        {(hasVisited === false)

          ? <Popup handleClear={this.handleClearDemo} />

          : null}

        <Filter handleChange={this.handleChange} />

        {(touched === false)

          ? <></>

          : <Wheel />}

      </>
    );
  }

  render() {
    const {
      recipes,
      restaurants,
      inOrOut,
      style,
      recipe,
      wheelOptions,
      userRestaurants,
      userId,
      loggedIn,
    } = this.state;

    const value = {
      recipes,
      restaurants,
      inOrOut,
      style,
      recipe,
      wheelOptions,
      handleWheelOptions: this.handleWheelOptions,
      findRecipe: this.findRecipe,
      handleToken: this.handleToken,
      setUserId: this.setUserId,
      userRestaurants,
    };

    return (

      <Context.Provider value={value}>

        <Header loggedIn={loggedIn} />

        {loggedIn
          ? (

            <nav>

              <ul>

                <li><Link className="nav-link" to="/">Home</Link></li>

                <li><Link className="nav-link" to={`/${userId}/favorites`}>Favorites</Link></li>

                <li><Link className="nav-link" to={`/${userId}/restaurants`}>My Restaurants</Link></li>

                <li><Link className="nav-link" to={`/${userId}/recipes`}>My Recipes</Link></li>

                <li><Link className="nav-link" to={`/${userId}/newThing`}>Add New</Link></li>

              </ul>

            </nav>

          )
          : <></>}

        <main>

          <Switch>

            <Route exact path="/" component={this.renderMainView} />

            <Route path="/recipes/:recipeId" render={(props) => (<RecipeDetailView {...props} recipe={recipe} />)} />

            <Route path="/restaurants/:restaurantId" render={(props) => (<RestaurantDetailView {...props} />)} />

            <PublicOnlyRoute path="/register" component={RegistrationPage} />

            <PublicOnlyRoute path="/login" component={LoginPage} />

            <PrivateRoute path="/:userId" component={UserPage} />

          </Switch>

        </main>

        <Footer />

      </Context.Provider>

    );
  }
}

export default App;
