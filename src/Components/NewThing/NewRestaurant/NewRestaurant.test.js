  
import React from 'react';
import ReactDOM from 'react-dom';
import NewRestaurant from '../NewRestaurant';
import { BrowserRouter } from 'react-router-dom';

describe('New restaurant form section component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><NewRestaurant />
    </BrowserRouter>, div)
  })
});
