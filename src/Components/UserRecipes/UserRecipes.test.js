import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import UserRecipes from './UserRecipes';


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <UserRecipes />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})