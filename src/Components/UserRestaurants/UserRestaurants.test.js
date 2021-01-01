import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import UserRestaurants from './UserRestaurants';


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <UserRestaurants />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})