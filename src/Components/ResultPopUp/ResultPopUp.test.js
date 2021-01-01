import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ResultPopUp from './ResultPopUp';


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <ResultPopUp />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})