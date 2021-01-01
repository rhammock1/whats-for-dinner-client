  
import React from 'react';
import ReactDOM from 'react-dom';
import NewRecipe from './NewRecipe';
import { BrowserRouter } from 'react-router-dom';

describe('NotePageNav component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><NewRecipe />
    </BrowserRouter>, div)
  })
})