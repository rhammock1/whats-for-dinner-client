import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import RecipeDetailView from './RecipeDetailView';


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <RecipeDetailView />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})