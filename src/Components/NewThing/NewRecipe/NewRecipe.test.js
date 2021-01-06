  
import React from 'react';
import ReactDOM from 'react-dom';
import NewRecipe from './NewRecipe';
import { BrowserRouter } from 'react-router-dom';

const ingredients = [
  { id: 1, amount: 2, unit: 'cups', ingredient: 'carrot'},
]

describe('New Recipe Form section component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><NewRecipe ingredients={ingredients} />
    </BrowserRouter>, div)
  })
})