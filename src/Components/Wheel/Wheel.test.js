import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Wheel from './Wheel';


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Wheel />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})