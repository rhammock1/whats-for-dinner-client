import React, { Component } from 'react';
import Header from './Header/Header';
import config from './config';
import './App.css';
import Filter from './Filter/Filter';
import Wheel from './Wheel/Wheel';
import Context from './Context';
import Footer from './Footer/Footer';
import RestaurantDetailView from './RestaurantDetailView/RestaurantDetailView';
import { Route, Switch, Link } from 'react-router-dom';
import RecipeDetailView from './RecipeDetailView/RecipeDetailView';
import PublicOnlyRoute from './Utils/PublicOnlyRoute';
import RegistrationPage from './routes/RegistrationPage';
import PrivateRoute from './Utils/PrivateRoute';
import UserPage from './routes/UserPage';
import LoginPage from './routes/LoginPage';
import TokenService from './services/token-service';
import apiService from './services/api-service';



class App extends Component {
  state = {
    recipes: [],
    restaurants: [],
    inOrOut: '',
    style: '',
    wheelOptions: [],
    touched: false,
    recipe: {},
    hasError: false,
    loggedIn: false,
    userId: 0,
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
    if(TokenService.hasAuthToken()) {
      this.setState({ loggedIn: true })
      const userId = TokenService.getUserId();
      this.setState({ userId: userId })

      Promise.all([
      fetch(`${config.API_ENDPOINT}/dinner/${userId}/restaurants`),
      fetch(`${config.API_ENDPOINT}/dinner/${userId}/recipes`)
    ])
    .then(([restaurantsRes, recipesRes]) => {
      if (!restaurantsRes.ok) {
        return restaurantsRes.json().then(e => Promise.reject(e))
      }
      if(!recipesRes.ok) {
        return recipesRes.json().then(e => Promise.reject(e))
      }
      return Promise.all([
        restaurantsRes.json(),
        recipesRes.json(),
      ])
    })
    .then(([restaurants, recipes]) => {
      this.setState({ recipes, restaurants })
    })
    .catch(error => {
      console.error({ error })
    })
    this.getFavorites();
    } else {
      this.setState({ loggedIn: false })
      Promise.all([
      fetch(`${config.API_ENDPOINT}/restaurants`),
      fetch(`${config.API_ENDPOINT}/recipes`)
    ])
    .then(([restaurantsRes, recipesRes]) => {
      if (!restaurantsRes.ok) {
        return restaurantsRes.json().then(e => Promise.reject(e))
      }
      if(!recipesRes.ok) {
        return recipesRes.json().then(e => Promise.reject(e))
      }
      return Promise.all([
        restaurantsRes.json(),
        recipesRes.json(),
      ])
    })
    .then(([restaurants, recipes]) => {
      this.setState({ recipes, restaurants })
    })
    .catch(error => {
      console.error({ error })
    })
    }
    
    }
  findRecipe = (recipeId) => {
    
    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`)
      .then(res => {
        if(!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        return res.json()
      })
      .then(recipe => {
        
         this.setState({
           recipe: recipe
         })
         return recipe
      })
      .catch(error => {
      console.error({ error })
    })
  }
  handleToken = () => {
    TokenService.hasAuthToken()
      ? this.setState({ loggedIn: true })
      : this.setState({ loggedIn: false })

  }
 
  
  handleChange = (ev) => {
    if(this.state.touched === true) {
      this.setState({ touched: false })
    }
    
    let filterOption = ev.target.id;
    (filterOption === 'inOrOut')
      ? this.setState({ inOrOut: ev.target.value })
      : this.setState({ style: ev.target.value })
  }
  getFavorites = () => {
    if(TokenService.hasAuthToken()) {
      const userId = this.state.userId;
      apiService.getUsersThings(userId, 'favorites')
        .then(favorites => this.setState({favorites}))
        .catch(error => console.error(error))
      }
  }

  handleWheelOptions = e => {
    e.preventDefault();
    this.setState({ touching: false, touched: true })
    let wheelOptions = [];
    if(this.state.loggedIn && this.state.inOrOut === 'recipes') {
      let filteredFavorites = this.state.favorites.filter(favorite => favorite.what_it_is === 'recipe');
      let filtered = [];
      let recipeIds = this.state.recipes.map(recipe => {
        return recipe.id
      })
      for(let i = 0; i < filteredFavorites.length; i++) {
        if(recipeIds.includes(filteredFavorites[i].item_id)) {
          filtered.push(this.state.recipes.filter(recipe => recipe.id === filteredFavorites[i].item_id))
        }

      }
     
    let recipes=[];
    filtered.map(array => 
 
      array.map(recipe => 
        
        recipes.push(recipe)
      )
    )
      
      for(let i = 0; i < 3; i++) {
        let chosen = recipes[Math.floor(Math.random() * recipes.length)];
        wheelOptions.push(chosen);
      }
      for(let i = 0; i < 6; i++) {
        let chosen = this.state.recipes[Math.floor(Math.random() * 9)];
        wheelOptions.push(chosen);
      }
      console.log(wheelOptions)
    } else if (this.state.inOrOut === 'recipes') {
      for(let i = 0; i < 9; i++) {
        let chosen = this.state.recipes[Math.floor(Math.random() * 9)];
        wheelOptions.push(chosen);
      }
      
    }
    if(this.state.loggedIn && this.state.inOrOut === 'restaurants') {
      let filteredFavorites = this.state.favorites.filter(favorite => favorite.what_it_is === 'restaurant');
      let filtered = [];
  
      for(let i = 0; i < filteredFavorites.length; i++) {
    
        filtered.push(this.state.restaurants.filter(restaurant => restaurant.id === filteredFavorites[i].item_id))

      }
     
    let restaurants=[];
    filtered.map(array => 
 
      array.map(restaurant => 
        
        restaurants.push(restaurant)
      )
    )
    if(this.state.style === 'local') {
      let local = this.state.restaurants.filter(restaurant => 
          restaurant.style === 'local'
        );
      for(let i = 0; i < 3; i++) {
        let chosen = restaurants[Math.floor(Math.random() * restaurants.length)];
        wheelOptions.push(chosen);
      }
      for(let i = 0; i < 6; i++) {
        let chosen = local[Math.floor(Math.random() * 9)];
        wheelOptions.push(chosen);
      }
      console.log(wheelOptions)
    }
    if(this.state.style === 'chain') {
      let chain = this.state.restaurants.filter(restaurant => 
          restaurant.style === 'chain'
        );
      for(let i = 0; i < 3; i++) {
        let chosen = restaurants[Math.floor(Math.random() * restaurants.length)];
        wheelOptions.push(chosen);
      }
      for(let i = 0; i < 6; i++) {
        let chosen = chain[Math.floor(Math.random() * 9)];
        wheelOptions.push(chosen);
      }
      console.log(wheelOptions)
    }
      
    } else if(this.state.inOrOut === 'restaurants') {
      if(this.state.style === 'local') {
        
        let local = this.state.restaurants.filter(restaurant => 
          restaurant.style === 'local'
        )
        for(let i = 0; i < 9; i++) {
        
        let chosen = local[Math.floor(Math.random() * 9)];
        wheelOptions.push(chosen);
      }
         
      } else {
        let chain = this.state.restaurants.filter(restaurant => 
          restaurant.style === 'chain')
            for(let i = 0; i < 9; i++) {
        
              let chosen = chain[Math.floor(Math.random() * 9)];
              wheelOptions.push(chosen);
            }
          }
        }
    if(this.state.inOrOut === 'both') {
      let recipes = this.state.recipes;
      let both;
      if(this.state.style === 'local') {
        
        let local = this.state.restaurants.filter(restaurant => 
          restaurant.style === 'local'
        )
        both = [...local, ...recipes];
        
        for(let i = 0; i < 9; i++) {
        
        let chosen = both[Math.floor(Math.random() * both.length)];
        wheelOptions.push(chosen);
      }
         
      } else if(this.state.style === 'chain') {
        let chain = this.state.restaurants.filter(restaurant => 
          restaurant.style === 'chain')
        both = [...chain, ...recipes]
        
        for(let i = 0; i < 9; i++) {
        
              let chosen = both[Math.floor(Math.random() * both.length)];
              wheelOptions.push(chosen);
          }
        } else {
          let both = [...this.state.restaurants, ...this.state.recipes]
          
          for(let i = 0; i < 9; i++) {
        
              let chosen = both[Math.floor(Math.random() * both.length)];
              wheelOptions.push(chosen);
          }
        }
    }
    this.setState({ wheelOptions: wheelOptions  })
  }
  renderMainView = () => {
    return (
      <>
        <Filter handleChange={this.handleChange}/>
        {(this.state.touched === false)
          ? <></>
          : <Wheel />
        }
    </>
    )
  }
  


  render() {
    const value = {
      recipes: this.state.recipes,
      restaurants: this.state.restaurants,
      inOrOut: this.state.inOrOut,
      style: this.state.style,
      recipe: this.state.recipe,
      wheelOptions: this.state.wheelOptions,
      handleWheelOptions: this.handleWheelOptions,
      findRecipe: this.findRecipe,
      handleToken: this.handleToken,
      setUserId: this.setUserId,
    }
    const userId = this.state.userId;
    return (
      <Context.Provider value={value}>
        <Header loggedIn={this.state.loggedIn} />
        {this.state.loggedIn 
          ? <nav>
              <ul>
                <Link to={`/${userId}/favorites`}><li>Favorites</li></Link>
                <Link to={`/${userId}/restaurants`}><li>My Restaurants</li></Link>
                <Link to={`/${userId}/recipes`}><li>My Recipes</li></Link>
                <Link to={`/${userId}/newThing`}><li>Add New</li></Link>
              </ul>
            </nav>
          : <></> 
        }
        <main>
          <Switch>
            <Route exact path='/' component={this.renderMainView} />
            <Route path='/recipes/:recipeId' render={(props) => (<RecipeDetailView {...props} recipe={this.state.recipe} />)} />
            <Route path='/restaurants/:restaurantId' render={(props) => (<RestaurantDetailView {...props} />)} />
            <PublicOnlyRoute path='/register' component={RegistrationPage} />
            <PublicOnlyRoute path='/login' component={LoginPage} />
            <PrivateRoute path='/:userId' component={UserPage} />
          </Switch>
          
        </main>
        <Footer />
      </Context.Provider>
    )
  }
}

export default App;
