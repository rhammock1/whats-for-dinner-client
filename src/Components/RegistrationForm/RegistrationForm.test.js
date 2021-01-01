import React from 'react';
import { shallow, } from 'enzyme';
import toJson from 'enzyme-to-json';
import RegistrationForm from './RegistrationForm';

import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'





describe('Registration form', () => {
  it('renders the complete form', () => {
    const wrapper = shallow(<RegistrationForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
})