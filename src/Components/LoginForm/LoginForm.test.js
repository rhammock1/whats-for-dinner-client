import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LoginForm from './LoginForm';


describe('Login Form ', () => {
  it('renders the complete form', () => {
    const wrapper = shallow(<LoginForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})