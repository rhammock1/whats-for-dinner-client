import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NewThing from './NewThing';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

describe('Form component for user to add new thing', () => {
  it('renders the complete form', () => {
    const wrapper = shallow(<NewThing />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})