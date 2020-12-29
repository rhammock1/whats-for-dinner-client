import React from 'react';

export default React.createContext({
  recipes: [],
  restaurants: [],
  inOrOut: '',
  style: '',
  recipe: {},
  wheelOptions: [],
  handleWheelOptions: () => {},
  findRecipe: () => {},
  handleToken: () => {},
})