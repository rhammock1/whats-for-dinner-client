  
import React from 'react';
import ReactDOM from 'react-dom';
import Favorites from './Favorites';
import { BrowserRouter } from 'react-router-dom';

describe('Favorites component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Favorites />
    </BrowserRouter>, div)
  })
})