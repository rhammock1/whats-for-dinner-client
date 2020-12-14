import React, { Component } from 'react';
import Header from './Header/Header';
import config from './config';
import './App.css';

class App extends Component {
  state = {
    recipes: [],
    restaurants: []
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

  render() {
    return (
      <>
        <Header />
        <main>

        </main>
      </>
    )
  }
}

export default App;
