import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NewThing from './NewThing';


describe('Form component for user to add new thing', () => {
  const seedIngredients = [];
  beforeAll(() => {
    for(let i = 0; i < 5; i++) {
      seedIngredients.push(`${i} each ingredient${i}`);
    }
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><NewThing />
    </BrowserRouter>, div)
  })
  it('renders the complete form', () => {
    const wrapper = shallow(<NewThing />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})