import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './Filter';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';


describe('Filter component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Filter />
    </BrowserRouter>, div)
  })
  it('renders the complete form', () => {
    const wrapper = shallow(<Filter />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})