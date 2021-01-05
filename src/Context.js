import React from 'react';

export default React.createContext({
  recipes: [],
  userRestaurants: [],
  restaurants: [],
  inOrOut: '',
  style: '',
  recipe: {},
  wheelOptions: [],
  handleWheelOptions: () => {},
  findRecipe: () => {},
  handleToken: () => {},
});
