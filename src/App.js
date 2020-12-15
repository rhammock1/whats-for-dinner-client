import React, { Component } from 'react';
import Header from './Header/Header';
import config from './config';
import './App.css';
import Filter from './Filter/Filter';
import Wheel from './Wheel/Wheel';
import Context from './Context';
import Footer from './Footer/Footer';
import RestaurantDetailView from './RestaurantDetailView/RestaurantDetailView';
import { Route } from 'react-router-dom';
import RecipeDetailView from './RecipeDetailView/RecipeDetailView';


class App extends Component {
  state = {
    recipes: [],
    restaurants: [],
    inOrOut: '',
    style: '',
    wheelOptions: [],
    touched: false,
    touching: false,
    recipe: {},
  }

  componentDidMount() {
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
  findRecipe = (recipeId) => {
    
    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`)
      .then(res => {
        if(!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        return res.json()
      })
      .then(recipe => {
        console.log(recipe)
         this.setState({
           recipe: recipe
         })
      })
      .catch(error => {
      console.error({ error })
    })
  }


  
  handleChange = (ev) => {
    if(this.state.touched === true) {
      this.setState({ touched: false, touching: true })
    }
    
    let filterOption = ev.target.id;
    (filterOption === 'inOrOut')
      ? this.setState({ inOrOut: ev.target.value })
      : this.setState({ style: ev.target.value })
  }

  handleWheelOptions = e => {
    e.preventDefault();
    this.setState({ touching: false, touched: true })
    let wheelOptions = [];
    if (this.state.inOrOut === 'recipes') {
      for(let i = 0; i < 9; i++) {
        let chosen = this.state.recipes[Math.floor(Math.random() * 9)];
        wheelOptions.push(chosen);
      }
      
    }
    if(this.state.inOrOut === 'restaurants') {
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
      if(this.state.style === 'local') {
        
        let local = this.state.restaurants.filter(restaurant => 
          restaurant.style === 'local'
        )
        for(let i = 0; i < 9; i++) {
        
        let chosen = local[Math.floor(Math.random() * 9)];
        wheelOptions.push(chosen);
      }
         
      } else if(this.state.style === 'chain') {
        let chain = this.state.restaurants.filter(restaurant => 
          restaurant.style === 'chain')
            for(let i = 0; i < 9; i++) {
        
              let chosen = chain[Math.floor(Math.random() * 9)];
              wheelOptions.push(chosen);
          }
        } else {
          let both = [...this.state.restaurants, ...this.state.recipes]
          console.log(both);
          for(let i = 0; i < 9; i++) {
        
              let chosen = both[Math.floor(Math.random() * both.length)];
              wheelOptions.push(chosen);
          }
        }
      console.log(wheelOptions)
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
      findRecipe: this.findRecipe
    }
    return (
      <Context.Provider value={value}>
        <Header />
        <main>
          <Route exact path='/' component={this.renderMainView} />
          <Route path='/recipes/:recipeId' render={(props) => (<RecipeDetailView {...props} recipe={this.state.recipe} />)} />
          <Route path='/restaurants/:restaurantId' render={(props) => (<RestaurantDetailView {...props} />)} />
        </main>
        <Footer />
      </Context.Provider>
    )
  }
}

export default App;
