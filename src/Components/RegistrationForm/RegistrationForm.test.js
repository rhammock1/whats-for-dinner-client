import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import RegistrationForm from './RegistrationForm';


describe('Registration form', () => {
  it('renders the complete form', () => {
    const wrapper = shallow(<RegistrationForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  // it('Should not submit form if the input is empty', () => {
  //   const callback = jest.fn();
  //   const wrapper = mount(<RegistrationForm onRegistrationSuccess={callback} />);
  //   wrapper.simulate('submit');
  //   expect(callback).not.toHaveBeenCalled();
  //   });
})