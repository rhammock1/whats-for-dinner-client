import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import RestaurantDetailView from './RestaurantDetailView';


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <RestaurantDetailView />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})