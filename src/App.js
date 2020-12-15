import React, { Component } from 'react';
import Header from './Header/Header';
import config from './config';
import './App.css';
import Filter from './Filter/Filter';
import Wheel from './Wheel/Wheel';
import Context from './Context';

class App extends Component {
  state = {
    recipes: [],
    restaurants: [],
    inOrOut: '',
    style: '',
    wheelOptions: [],
    touched: false
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
  handleChange = (ev) => {
    let filterOption = ev.target.id;
    (filterOption === 'inOrOut')
      ? this.setState({ inOrOut: ev.target.value })
      : this.setState({ style: ev.target.value })
  }

  handleWheelOptions = e => {
    e.preventDefault();
    let wheelOptions = [];
    if (this.state.inOrOut === 'recipes') {
      for(let i = 0; i < 9; i++) {
        let chosen = this.state.recipes[Math.floor(Math.random() * 9)];
        wheelOptions.push(chosen.title);
      }
      
    }
    if(this.state.inOrOut === 'restaurants') {
      if(this.state.style === 'local') {
        let local = this.state.restaurants.filter(restaurant => 
          restaurant.style === 'local'
        )
        for(let i = 0; i < 9; i++) {
        
        let chosen = this.state.restaurants[Math.floor(Math.random() * 9)];
        wheelOptions.push(chosen.title);
      }
         
      } else {
        this.state.restaurants.filter(restaurant => {
          if(restaurant.style === 'chain') {
            wheelOptions.push(restaurant.title)
          }
        })
      }
    }
    this.setState({ wheelOptions })
  }

  render() {
    const value = {
      recipes: this.state.recipes,
      restaurants: this.state.restaurants,
      inOrOut: this.state.inOrOut,
      style: this.state.style,
      wheelOptions: this.state.wheelOptions
    }
    return (
      <Context.Provider value={value}>
        <Header />
        <main>
          <Filter handleWheelOptions={this.handleWheelOptions} handleChange={this.handleChange}/>
          {(this.state.wheelOptions.length === 0)
            ? <></>
            : <Wheel wheelOptions={this.state.wheelOptions} />
          }
          
        </main>
      </Context.Provider>
    )
  }
}

export default App;
