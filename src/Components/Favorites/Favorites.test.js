import React from 'react';
import ReactDOM from 'react-dom';
import Favorites from './Favorites';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';


describe('Favorites component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Favorites />
    </BrowserRouter>, div)
  })
  it('renders the complete form', () => {
    const wrapper = shallow(<Favorites />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})